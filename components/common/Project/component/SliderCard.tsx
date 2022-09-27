import {useEffect} from 'react';
import RecommendCard from './RecommendCard';

var data = [
  {
    id: 1,
    title: 'Project Title',
  },
  {
    id: 2,
    title: 'Project Title',
  },
  {
    id: 3,
    title: 'Project Title',
  },
  {
    id: 4,
    title: 'Project Title',
  },
  {
    id: 5,
    title: 'Project Title',
  },
  {
    id: 6,
    title: 'Project Title',
  },
  {
    id: 7,
    title: 'Project Title',
  },
  {
    id: 8,
    title: 'Project Title',
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
      className="scroll w-full flex-row overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide md:max-w-2xl "
    >
      {data.map((item, index) => (
        <RecommendCard key={item.id} title={item.title} index={index} />
      ))}
    </div>
  );
}

export default SliderCard;
