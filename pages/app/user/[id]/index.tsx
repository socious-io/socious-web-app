/*
 * user profile page with dynamik route
 */

import type {NextPage} from 'next';
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
import SplashScreen from 'layout/Splash';
import {UserProfile} from '@models/profile';

// Libraries
const libraries: Libraries = ['places'];

const ProfilePage: NextPage = () => {
  // get id from route
  const router = useRouter();
  const {id} = router.query;
  const {state: editState, handlers: editHandlers} = useToggle();
  // User
  const {user} = useUser();

  // Loading The Map
  const {isLoaded, loadError} = useGoogleMapsScript({
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
          closeModal={editHandlers.off}
        />
      )}
    </GeneralLayout>
  );
};

export default ProfilePage;
