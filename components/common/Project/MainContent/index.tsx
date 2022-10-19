import ImageBanner from '../component/ImageBanner';
import RecommendCheck from '../component/RecommendCheck';
import ProjectCard from '../component/ProjectCard';
import {useToggle} from '@hooks';
import {get} from 'utils/request';
import {Project} from '@models/project';
import {useMemo} from 'react';
import useSWRInfinite from 'swr/infinite';
import {Button} from '@components/common';
interface Props {
  onClickShow: () => void;
}

const MainContent = ({onClickShow}: Props) => {
  const {state: showMore, handlers: seeAll} = useToggle();
  const getKey = (initialSize: number, previousData: any) => {
    if (previousData && !previousData?.items?.length) return null;
    return `/projects?page=${initialSize + 1}`;
  };
  const {
    data: infiniteProject,
    error: infiniteError,
    size,
    setSize,
  } = useSWRInfinite<any>(getKey, get, {
    shouldRetryOnError: false,
    revalidateFirstPage: false,
  });

  const flatProjectArray = useMemo(() => {
    if (!isNaN(infiniteProject as any)) return [];
    return infiniteProject?.map((page) => page?.items)?.flat(1);
  }, [infiniteProject]);

  const noMoreMessage = useMemo(
    () => size * 10 >= infiniteProject?.[0]?.['total_count'],
    [size, infiniteProject],
  );

  if (!infiniteProject && !infiniteError) <div>Loading....</div>;

  return (
    <div className="mb-10 space-y-6">
      <div>
        <ImageBanner />
      </div>

      <div className="space-y-6 px-4">
        {showMore && <RecommendCheck />}
        {flatProjectArray?.map((item: Project) => (
          <ProjectCard key={item?.id} project={item} />
        ))}
      </div>
      {!noMoreMessage && (
        <div className="flex justify-center">
          <Button
            variant="link"
            className="font-semibold text-primary"
            onClick={() => setSize(size + 1)}
          >
            See more
          </Button>
        </div>
      )}
    </div>
  );
};

export default MainContent;
