import type {NextPage} from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from 'layout/screen/ProjectCard/ProjectCard';
import SliderCard from 'layout/screen/ProjectCard/SliderCard';

const Project: NextPage = () => {
  return (
    <main className="bg-white shadow rounded-lg px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="max-w-3xl mx-auto">
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
    </main>
  );
};

export default Project;
