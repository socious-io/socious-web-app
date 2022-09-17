import type {NextPage} from 'next';
import ProjectCard from 'layout/screen/Project/ProjectCard';
import SliderCard from 'layout/screen/Project/SliderCard';
import ImageBanner from 'layout/screen/Project/ImageBanner';
import SideBar from '@components/common/Home/SideBar';
const ImgUrl = require('../../asset/images/project.png');

const Project: NextPage = () => {
  return (
    <div className="flex mt-10 space-x-6">
      <SideBar />
      <div className="max-w-3xl mx-auto pr-6">
        <ImageBanner />
        <p className="text-base mt-6 mb-4 text-secondary font-semibold">
          Recommended you
        </p>
        <SliderCard />
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
    </div>
  );
};

export default Project;
