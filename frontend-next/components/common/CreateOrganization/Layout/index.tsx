import Button from '@components/common/Button/Button';

import React from 'react';

import Carousel from './Carousel';
import Title from './Title';

const Layout = () => {
  return (
    <div className="bg-clearWhite w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
      <div className="bg-white w-full h-full min-w-360 md:w-4/12 md:h-4/5 md:rounded-3xl flex flex-col ">
        <Carousel />
        <Title />
        <div className="h-full"></div>

        <footer className="flex pt-4 pb-10 justify-center border-grayLineBased border-t">
          <Button className="w-8/12 flex justify-center py-1.5 font-medium">
            continue
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
