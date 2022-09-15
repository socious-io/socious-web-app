import React from 'react';
import Carousel from './Carousel';

const Layout = () => {
  return (
    <div className="bg-clearWhite w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
      <div className="bg-white w-full h-full min-w-360 md:w-4/12 md:h-4/5 md:rounded-3xl ">
        <Carousel />
        <footer>
          
        </footer>
      </div>
    </div>
  );
};

export default Layout;
