import ImageBanner from '../component/ImageBanner';
import RecommendCheck from '../component/RecommendCheck';
import ProjectCard from '../component/ProjectCard';

import {useToggle} from '@hooks';
import {Project} from '@models/project';
import {Button} from '@components/common';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';
interface Props {
  onClickShow: () => void;
}

const MainContent = ({onClickShow}: Props) => {
  const {state: showMore, handlers: seeAll} = useToggle();

  const {flattenData, isLoading, seeMore, loadMore} = useInfiniteSWR<Project>(
    '/projects?status=ACTIVE',
  );

  if (isLoading) <div>Loading....</div>;

  return (
    <div className="mb-10 space-y-6">
      <div>
        <ImageBanner />
      </div>

      <div className="space-y-6 px-4">
        {showMore && <RecommendCheck />}
        {flattenData?.map((item: Project) => (
          <ProjectCard key={item?.id} project={item} />
        ))}
      </div>
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
  );
};

export default MainContent;
