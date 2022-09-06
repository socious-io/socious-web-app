import { NextPage } from 'next';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { get } from 'utils/request';
import SideBar from '@components/common/Home/SideBar';
import MainContent from '@components/common/Home/MainContent';
import useUser from 'hooks/useUser/useUser';

const Index: NextPage = () => {
  
  return (
    <div className='flex mt-10 space-x-6'>
      <SideBar />
      <MainContent />
    </div>
  );
};

export default Index;