import React, {useCallback} from 'react';
import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {Libraries, useGoogleMapsScript} from 'use-google-maps-script';
import {GeneralLayout} from 'layout';
import MainContent from '@components/common/UserProfile/MainContent';
import SplashScreen from 'layout/Splash';
import EditProfileModal from '@components/common/UserProfile/Edit/EditProfileModal/EditProfileModal';
import {get} from 'utils/request';
import {useToggle, useUser} from '@hooks';
import {skillsFetcher} from 'services/cacheSkills';
import {IOrganizationType} from 'models/organization';
import {Skill} from '@components/common/Search/Providers/SkillsProvider';
import {useEffect} from 'react';
import {useState} from 'react';

type OrganizationProfileProps = {
  skills: Skill[];
};

const libraries: Libraries = ['places'];

const OrganizationProfile: NextPage<OrganizationProfileProps> = () => {
  const router = useRouter();
  const {id} = router.query;
  const {state: editState, handlers: editHandlers} = useToggle();

  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    skillsFetcher().then(setSkills);
  }, []);

  const {user} = useUser();

  const {isLoaded} = useGoogleMapsScript({
    googleMapsApiKey: process.env['NEXT_PUBLIC_GOOGLE_API_KEY'] ?? '',
    libraries,
  });

  const openEditModal = useCallback(() => editHandlers.on(), [editHandlers]);

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
      editProfile={openEditModal}
    />
  );

  return (
    <GeneralLayout>
      <div className="flex w-full flex-col justify-center md:flex-row  md:px-8  lg:px-0 ">
        {showIfDataLoaded(mainContent, resp.data)}
      </div>
      {/* EDIT PROFILE */}
      {isLoaded && user && user.id === resp.data?.id && (
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

export default OrganizationProfile;
