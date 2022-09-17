import ImageBanner from './ImageBanner';
import RecommendCheck from './RecommendCheck';
import SliderCard from '../SliderCard';
import ProjectCard from '../ProjectCard';

const MainContent = () => {
  return (
    <div className="mb-10 w-full space-y-6">
      <ImageBanner />
      <p className=" mb-4 w-full text-base font-semibold text-secondary">
        Recommended you
      </p>
      <SliderCard />
      <RecommendCheck />
      <ProjectCard
        title={''}
        description={''}
        country_id={0}
        project_type={0}
        project_length={0}
        payment_type={0}
        payment_scheme={0}
        payment_range_lower={''}
        payment_range_higher={''}
        experience_level={0}
      />
    </div>
  );
};

export default MainContent;
