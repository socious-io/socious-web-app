import type {NextPage} from 'next';
import {GeneralLayout} from 'layout';
import {useCallback, useEffect, useState} from 'react';
import useSWR from 'swr';
import {useRouter} from 'next/router';
import {useGoogleMapsScript, Libraries} from 'use-google-maps-script';
import {useToggle, useUser} from '@hooks';
import {get} from 'utils/request';
import MainContent from '@components/common/UserProfile/MainContent';
import EditProfileModal from '@components/common/UserProfile/Edit/EditProfileModal/EditProfileModal';
import {UserProfile} from '@models/profile';
import {skillsFetcher} from 'services/cacheSkills';
import {Skill} from '@components/common/Search/Providers/SkillsProvider';
import {GridLoader} from 'react-spinners';
const libraries: Libraries = ['places'];

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const {id} = router.query;
  const {state: editState, handlers: editHandlers} = useToggle();
  const {user} = useUser();
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    skillsFetcher().then(setSkills);
  }, []);

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
