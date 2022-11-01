import React from 'react';
import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {GeneralLayout} from 'layout';
import MainContent from '@components/common/UserProfile/MainContent';
import {get} from 'utils/request';
import {IOrganizationType} from 'models/organization';
import SplashScreen from 'layout/Splash';

const OrganizationProfile: NextPage = () => {
  const router = useRouter();
  const {id} = router.query;

  const resp = useSWR<IOrganizationType>(`/orgs/by-shortname/${id}`, get);

  if (
    resp.error?.response?.status === 400 ||
    (500 &&
      resp.error?.response?.data?.error.startsWith(
        'invalid input syntax for type uuid',
      ))
  )
    return <p>invalid user</p>;

  const showIfDataLoaded = (child: JSX.Element, data?: IOrganizationType) => {
    return data ? child : <SplashScreen />;
  };

  const mainContent = (
    <MainContent
      data={resp.data}
      status="organizations"
      profile_mutate={resp.mutate}
    />
  );

  return (
    <GeneralLayout>
      <div className="flex w-full flex-col justify-center md:flex-row  md:px-8  lg:px-0 ">
        {showIfDataLoaded(mainContent, resp.data)}
      </div>
    </GeneralLayout>
  );
};

export default OrganizationProfile;
