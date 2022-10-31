/*
 * user profile page with dynamic route
 */

import React from 'react';
import type {NextPage} from 'next';
import {useRouter} from 'next/router';

//libraries
import useSWR from 'swr';

//components
import {GeneralLayout} from 'layout';
import MainContent from '@components/common/UserProfile/MainContent';

//utils
import {get} from 'utils/request';

// Type
import {IOrganizationType} from 'models/organization';
import SplashScreen from 'layout/Splash';

const OrganizationProfile: NextPage = () => {
  // get id from route
  const router = useRouter();
  const {id} = router.query;

  //get user profile data by user id
  const {data, mutate, error} = useSWR<IOrganizationType>(
    `/orgs/by-shortname/${id}`,
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

  if (!data) return <SplashScreen />;

  return (
    <GeneralLayout>
      <div className="flex w-full flex-col justify-center md:flex-row  md:px-8  lg:px-0 ">
        <MainContent
          data={data}
          status="organizations"
          profile_mutate={mutate}
        />
      </div>
    </GeneralLayout>
  );
};

export default OrganizationProfile;
