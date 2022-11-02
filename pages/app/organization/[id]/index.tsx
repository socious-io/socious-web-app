/*
 * user profile page with dynamic route
 */

import React, {useCallback} from 'react';
import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {useRouter} from 'next/router';

//libraries
import useSWR from 'swr';
import {Libraries, useGoogleMapsScript} from 'use-google-maps-script';

//components
import {GeneralLayout} from 'layout';
import MainContent from '@components/common/UserProfile/MainContent';
import SplashScreen from 'layout/Splash';
import EditProfileModal from '@components/common/UserProfile/Edit/EditProfileModal/EditProfileModal';

//utils
import {get} from 'utils/request';
import {useToggle, useUser} from '@hooks';
import getGlobalData from 'services/cacheSkills';

// Type
import {IOrganizationType} from 'models/organization';
import {Skill} from '@components/common/Search/Providers/SkillsProvider';
type OrganizationProfileProps = {
  skills: Skill[];
};
// Libraries
const libraries: Libraries = ['places'];

const OrganizationProfile: NextPage<OrganizationProfileProps> = ({skills}) => {
  // get id from route
  const router = useRouter();
  const {id} = router.query;
  const {state: editState, handlers: editHandlers} = useToggle();

  const {user} = useUser();

  // Loading The Map
  const {isLoaded} = useGoogleMapsScript({
    googleMapsApiKey: process.env['NEXT_PUBLIC_GOOGLE_API_KEY'] ?? '',
    libraries,
  });

  const openEditModal = useCallback(() => editHandlers.on(), [editHandlers]);

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
          editProfile={openEditModal}
        />
      </div>
      {/* EDIT PROFILE */}
      {isLoaded && user && user.id === data?.id && (
        <EditProfileModal
          openState={editState}
          user={user}
          skillsData={skills}
          closeModal={editHandlers.off}
        />
      )}
    </GeneralLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const skills = await getGlobalData();
  return {props: {skills}, revalidate: 60};
};

export default OrganizationProfile;
