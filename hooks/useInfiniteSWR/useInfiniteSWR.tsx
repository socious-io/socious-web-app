import {useCallback, useMemo} from 'react';
import {KeyedMutator} from 'swr';
import useSWRInfinite, {SWRInfiniteConfiguration} from 'swr/infinite';
import {get} from 'utils/request';

// Types
export type TInfiniteResponse<T> = {
  items: T[];
  limit: number;
  page: number;
  total_count: number;
};

export type TUseInfiniteSWRReturn<R> = {
  rawResponse: TInfiniteResponse<R>[] | undefined;
  flattenData: R[];
  seeMore: boolean;
  isLoading: boolean;
  setSize: (
    size: number | ((_size: number) => number),
  ) => Promise<TInfiniteResponse<R>[] | undefined>;
  mutateInfinite: KeyedMutator<TInfiniteResponse<R>[]>;
  size: number;
  infiniteError: any;
  loadMore: () => void;
  totalCount: number;
};

const useInfiniteSWR = <R = any,>(
  url: string | null,
  configs: SWRInfiniteConfiguration = {},
  deps: Array<any> = [],
): TUseInfiniteSWRReturn<R> => {
  const getKey = useCallback(
    (initialSize: number, previousData: TInfiniteResponse<R>) => {
      if (previousData && previousData?.items?.length < 10) return null;

      return (
        url && `${url + (url.includes('?') ? '&' : '?')}page=${initialSize + 1}`
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, ...deps],
  );

  const {
    data: infiniteData,
    error: infiniteError,
    mutate: mutateInfinite,
    size,
    setSize,
  } = useSWRInfinite<TInfiniteResponse<R>>(getKey, get, configs);

  const flattenData: R[] = useMemo(() => {
    return infiniteData?.map((page) => page?.items)?.flat(1) ?? [];
  }, [infiniteData]);

  const noMoreData: boolean = useMemo(
    () => size * 10 >= (infiniteData?.[0]?.['total_count'] ?? 0),
    [size, infiniteData],
  );

  const loadMore = useCallback(
    () => !noMoreData && setSize((size) => size + 1),
    [noMoreData, setSize],
  );

  const totalCount = useMemo(
    () =>
      infiniteData && infiniteData.length ? infiniteData[0].total_count : 0,
    [infiniteData],
  );

  return {
    rawResponse: infiniteData,
    flattenData,
    seeMore: !noMoreData,
    isLoading: !infiniteData && !infiniteError,
    setSize,
    mutateInfinite,
    size,
    infiniteError,
    loadMore,
    totalCount,
  };
};

export default useInfiniteSWR;
