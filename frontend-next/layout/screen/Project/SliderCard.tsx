import {useEffect} from 'react';
import RecommendCard from './RecommendCard';
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
function SliderCard() {
  //after geting real data  uncomment this
  // const slideLeft = () => {
  //   var slider = document.getElementById('slider');
  //   slider.scrollLeft = slider.scrollLeft - 500;
  // };

  // const slideRight = () => {
  //   var slider = document.getElementById('slider');
  //   slider.scrollLeft = slider.scrollLeft + 500;
  // };

  useEffect(() => {
    window.addEventListener('resize', () => {
      console.log(window.innerHeight, window.innerWidth);
    });
  }, []);
  return (
    <div
      id="slider"
      className="w-full   flex-row -ml-2 overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
    >
      <div className="flex  lg:mr-40 md:mr-20 mr-10 ">
        {data.map((item) => (
          <div className="w-full  inline-block  p-2 cursor-pointer  ease-in-out duration-300">
            <RecommendCard
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
        ))}
      </div>
    </div>
  );
}

export default SliderCard;
