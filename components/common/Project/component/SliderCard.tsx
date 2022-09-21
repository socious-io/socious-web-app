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
      className="scroll w-full flex-row overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide md:max-w-3xl "
    >
      {data.map((item) => (
        <RecommendCard
          key={item.id}
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
}

export default SliderCard;
