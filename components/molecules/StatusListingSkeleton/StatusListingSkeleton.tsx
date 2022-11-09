import {Button} from '@components/common';
import HeaderBox from '@components/common/Project/component/HeaderBox';
import {useToggle} from '@hooks';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';
import {twMerge} from 'tailwind-merge';

type StatusListingSkeletonProps<T> = {
  url: string | null;
  renderList: (data: T[]) => JSX.Element;
  rounded?: boolean;
  title: string;
  className?: string;
};

export const StatusListingSkeleton = <T = any,>({
  renderList,
  url,
  rounded = false,
  title,
  className,
}: StatusListingSkeletonProps<T>) => {
  const {state: expandState, handlers: expandHandler} = useToggle();

  const {flattenData, loadMore, seeMore, totalCount} = useInfiniteSWR<T>(
    url ? url : null,
  );

  return (
    <>
      <HeaderBox
        isRound={rounded}
        title={`${title} (${totalCount})`}
        isExpand={expandState}
        expandToggle={expandHandler.toggle}
        isExpandable={!!flattenData?.length}
        className={twMerge(
          className && className,
          expandState && 'rounded-b-none',
        )}
      />
      <div
        className={twMerge(
          'hidden h-0 p-4 ease-in-out',
          expandState && 'block h-auto',
        )}
      >
        {renderList(flattenData)}
        {seeMore && (
          <div className="flex justify-center">
            <Button
              variant="link"
              className="font-semibold text-primary"
              onClick={loadMore}
            >
              See more
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
