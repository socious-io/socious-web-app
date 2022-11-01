/*
 * user profile page with dynamik route
 */

import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {GeneralLayout} from 'layout';

//libraries
import {useCallback} from 'react';
import useSWR from 'swr';
import {useRouter} from 'next/router';
import {useGoogleMapsScript, Libraries} from 'use-google-maps-script';

// custom hooks/methods
import {useToggle, useUser} from '@hooks';
import {get} from 'utils/request';

//components
import MainContent from '@components/common/UserProfile/MainContent';
import EditProfileModal from '@components/common/UserProfile/Edit/EditProfileModal/EditProfileModal';
import {UserProfile} from '@models/profile';
import getGlobalData from 'services/cacheSkills';
import {Skill} from '@components/common/Search/Providers/SkillsProvider';
import {GridLoader} from 'react-spinners';

// Libraries
const libraries: Libraries = ['places'];

type ProfilePageProps = {
  skills: Skill[];
};

const ProfilePage: NextPage<ProfilePageProps> = ({skills}) => {
  // get id from route
  const router = useRouter();
  const {id} = router.query;
  const {state: editState, handlers: editHandlers} = useToggle();
  // User
  const {user} = useUser();

  // Loading The Map
  const {isLoaded} = useGoogleMapsScript({
    googleMapsApiKey: process.env['NEXT_PUBLIC_GOOGLE_API_KEY'] ?? '',
    libraries,
  });

  const openEditModal = useCallback(() => editHandlers.on(), [editHandlers]);

  //get user profile data by user id
  const {data, mutate, error} = useSWR<UserProfile>(
    `/user/by-username/${id}/profile`,
    get,
  );

  // Show this until the data is fetched
  if (
    error?.response?.status === 400 ||
    (500 &&
      error?.response?.data?.error.startsWith(
        'invalid input syntax for type uuid',
      ))
  ) {
    router.back();
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
        <p>Invalid user. Returning back.</p>
      </div>
    );
  }

  if ((!data && !error) || !data)
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );

  return (
    <GeneralLayout>
      <div className="flex w-full flex-col justify-center md:flex-row  md:px-8  lg:px-0 ">
        <MainContent
          data={data}
          status="users"
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

export default ProfilePage;

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
