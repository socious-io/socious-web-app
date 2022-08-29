import { NextPage } from 'next';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { get } from 'utils/request';

const Index: NextPage = () => {
  // const {data, error, mutate} = useSWR("/api/v2/user/profile", get)
  
  // useEffect(() => {console.log("data", data); console.log("error", error)}, [data, error]);

  return (
    <div>
      
    </div>
  );
};

export default Index;