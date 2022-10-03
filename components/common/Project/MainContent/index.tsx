import ImageBanner from '../component/ImageBanner';
import RecommendCheck from '../component/RecommendCheck';
import ProjectCard from '../component/ProjectCard';
import {useToggle} from '@hooks';
import useSWR from 'swr';
import {get} from 'utils/request';
import {Project} from '@models/project';

interface Props {
  onClickShow: () => void;
}

const MainContent = ({onClickShow}: Props) => {
  const {state: showMore, handlers: seeAll} = useToggle();
  const {data: allProject} = useSWR<any>(`/projects`, get);
  const allData = allProject?.items?.filter(
    (p: any) => p?.identity_type === 'organizations',
  );

  return (
    <div className="mb-10 space-y-6">
      <div>
        <ImageBanner />
      </div>

      <div className="space-y-6 px-4">
        {showMore && <RecommendCheck />}
        {allData?.map((item: Project) => (
          <ProjectCard
            key={item?.id}
            title={item?.title}
            description={item?.description}
            country_id={item?.country_id}
            project_type={item?.project_type}
            project_length={item?.project_length}
            payment_type={item?.payment_type}
            payment_scheme={item?.payment_scheme}
            payment_range_lower={item?.payment_range_lower}
            payment_range_higher={item?.payment_range_higher}
            experience_level={item?.experience_level}
            remote_preference={item?.remote_preference}
            causes_tags={item?.causes_tags}
          />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
