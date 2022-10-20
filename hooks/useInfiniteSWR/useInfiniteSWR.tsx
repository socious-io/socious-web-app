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
  setSize: (
    size: number | ((_size: number) => number),
  ) => Promise<TInfiniteResponse<R>[] | undefined>;
  mutateInfinite: KeyedMutator<TInfiniteResponse<R>[]>;
  size: number;
  infiniteError: any;
};

const useInfiniteSWR = <R = any,>(
  url: string,
  configs: SWRInfiniteConfiguration = {},
): TUseInfiniteSWRReturn<R> => {
  const getKey = useCallback(
    (initialSize: number, previousData: TInfiniteResponse<R>) => {
      if (previousData && previousData?.items?.length < 10) return null;
      return `${url + url.includes('?') ? '&' : '?'}page=${initialSize + 1}`;
    },
    [url],
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

  const noMoreData = useMemo(
    () => size * 10 >= (infiniteData?.[0]?.['total_count'] ?? 0),
    [size, infiniteData],
  );

  return {
    rawResponse: infiniteData,
    flattenData,
    seeMore: !noMoreData,
    setSize,
    mutateInfinite,
    size,
    infiniteError,
  };
};

export default useInfiniteSWR;
