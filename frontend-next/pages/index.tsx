import { NextPage } from 'next';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { get } from 'utils/request';
import SideBar from '@components/common/Home/SideBar';
import MainContent from '@components/common/Home/MainContent';

const Index: NextPage = () => {
  // const {data, error, mutate} = useSWR("/api/v2/user/profile", get)
  
  // useEffect(() => {console.log("data", data); console.log("error", error)}, [data, error]);
  return (
    <div className='flex mt-10 space-x-6'>
      <SideBar />
      <MainContent />
    </div>
  );
};

export default Index;