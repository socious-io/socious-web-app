/*
 * user profile page with dynamik route
 */

import React from 'react';
import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {GeneralLayout} from 'layout';

//libraries
import useSWR from 'swr';

//components
import MainContent from '@components/common/UserProfile/MainContent';
import {get} from 'utils/request';

const UserProfile: NextPage = () => {
  // get id from route
  const router = useRouter();
  const {id} = router.query;

  //get user profile data by user id
  const {data, mutate, error} = useSWR<any>(
    `/user/by-username/${id}/profile`,
    get,
  );

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
    <GeneralLayout>
      <div className="flex w-full flex-col justify-center md:flex-row  md:px-8  lg:px-0 ">
        <MainContent data={data} status="users" profile_mutate={mutate} />
      </div>
    </GeneralLayout>
  );
};

export default UserProfile;
