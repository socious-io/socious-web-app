import ImageBanner from '../component/ImageBanner';
import RecommendCheck from '../component/RecommendCheck';
import SliderCard from '../component/SliderCard';
import ProjectCard from '../component/ProjectCard';
import {useToggle} from '@hooks';

var data = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
];
const itemsToRender = data.slice(0, 3);

interface Props {
  onClickShow: () => void;
}

const MainContent = ({onClickShow}: Props) => {
  const {state: showMore, handlers: seeAll} = useToggle();

  return (
    <div className="mb-10 w-full space-y-6">
      {!showMore ? (
        <div>
          <ImageBanner />
          <div className="mt-4 flex justify-between">
            <p className="mb-4  text-base font-semibold text-secondary">
              Recommended you
            </p>
            <button
              onClick={() => {
                seeAll.on();
                onClickShow();
              }}
            >
              <p className=" mb-4 text-base font-semibold text-primary">
                See all
              </p>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-[78px]  items-center rounded-2xl border  border-grayLineBased bg-white py-4 ">
          <p className="px-4 text-base font-semibold ">Recommended you</p>
        </div>
      )}
      <SliderCard />
      {showMore && <RecommendCheck />}
      {itemsToRender.map((item) => (
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
      ))}
    </div>
  );
};

export default MainContent;
