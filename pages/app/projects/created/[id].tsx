/*
 * user projects page with dynamik route
 */

import React from 'react';
import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {GeneralLayout} from 'layout';
//libraries
import useSWR from 'swr';

//components
import {get} from 'utils/request';
import SideBar from '@components/common/Home/SideBar';
import MyApplicationBoxes from '@components/common/Project/created';

const ProjectApplications: NextPage = () => {
  // get id from route
  const router = useRouter();
  const {id} = router.query;

  //get user profile data by user id
  const {data, error} = useSWR<any>(`/user/by-username/${id}/profile`, get);

  // Show this until the data is fetched
  if (!data && !error) return <p>loading</p>;
  if (
    error?.response?.status === 400 ||
    (500 &&
      error?.response?.data?.error.startsWith(
        'invalid input syntax for type uuid',
      ))
  )
    return <p>invalid user</p>;

  return (
    <GeneralLayout hasNavbar>
      <SideBar />
      <MyApplicationBoxes />
    </GeneralLayout>
  );
};

export default ProjectApplications;
