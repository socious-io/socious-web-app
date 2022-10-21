/*
 * mainContent (left contetnt) of user/organization profile page
 * The type of profile is determined by status
 */

import React, {useMemo} from 'react';
import {useRouter} from 'next/router';

// components
import Header from './Header';
import ProfileInfo from './ProfileInfo';
import Skills from './Skills';
import ProjectItem from './ProjectItem';
import Description from './Description';
import Contact from './Contact';
import RightPaneContainer from '../RightPane/RightPaneContainer';
import ProjectList from '../RightPane/ProjectList';

// libraries
import useSWR, {KeyedMutator} from 'swr';

// utils
import {get} from 'utils/request';

// hooks
import {useUser} from '@hooks';

// interfaces
import {IdentityType} from '@models/identity';
import {IProjectsResponse, Project} from '@models/project';
interface Props {
  data: any;
  status: IdentityType;
  profile_mutate: KeyedMutator<any>;
  editProfile?: () => void;
}

const MainContent: React.FC<Props> = ({
  data,
  status,
  profile_mutate,
  editProfile,
}) => {
  const {user} = useUser({redirect: false});
  const router = useRouter();

  const {
    data: identities,
    mutate: identities_mutate,
    error,
  } = useSWR<any>(`/identities/${data.id}`, get);

  // TODO: Filter with status.
  const {data: projects} = useSWR<IProjectsResponse>(
    `/projects?identity=${data.id}`,
  );

  const activeProjects: Project[] = useMemo(() => {
    const filteredProjects =
      projects?.items.filter((project) => project.status === 'ACTIVE') ?? [];
    return filteredProjects.length > 3
      ? filteredProjects.slice(2)
      : filteredProjects;
  }, [projects]);

  if (!identities && !error) return <p>loading</p>;
  if (
    error?.response?.status === 400 ||
    (500 &&
      error?.response?.data?.error.startsWith(
        'invalid input syntax for type uuid',
      ))
  )
    return <p>invalid user identitiy</p>;

  const handleProjectsFooterClick = () => {
    router.push(`/app/organization/${data.shortname}/projects`);
  };

  return (
    <div className="mb-8 flex w-full flex-col items-start gap-6 md:flex-row">
      <div className="border-1 rounded-xl border border-grayLineBased bg-white md:w-4/6">
        <Header
          avatar={status === 'users' ? data?.avatar : data?.image}
          cover_image={data?.cover_image}
          status={status}
          following={identities?.following}
          mutualConnection={identities?.follower && identities?.following}
          id={data?.id}
          identities_mutate={identities_mutate}
          profile_mutate={profile_mutate}
          loggedIn={user ? true : false}
          own_user={user?.id === data?.id}
          editProfile={editProfile}
        />
        <ProfileInfo
          first_name={data?.first_name}
          last_name={data?.last_name}
          bio={data?.bio}
          followings={data?.followings}
          followers={data?.followers}
        />

        {/* if user/organization is current user/organization show 'You' */}
        {user?.id === data?.id && (
          <p className="mt-3 px-4 text-sm text-secondary">You </p>
        )}
        <ProjectItem title="Social Causes" items={data?.social_causes} />
        {status === 'users' ? (
          <Contact
            address={data?.address}
            country={data?.country}
            city={data?.city}
            status={status}
          />
        ) : (
          <Contact
            address={data?.address}
            country={data?.country}
            city={data?.city}
            mobile_country_code={data?.mobile_country_code}
            email={data?.email}
            phone={data?.phone}
            website={data?.website}
            status={status}
          />
        )}
        <Description paragraph={data?.mission} title="Mission" />
        {status === 'users' && <Skills skills={data?.skills} />}
        <hr className="mb-20 border-grayLineBased" />
      </div>

      <div className="w-full md:w-2/6">
        <RightPaneContainer
          title="Activity"
          footer="See all activity"
          className="mb-4"
        >
          {/** change to activity list component */}
          <ProjectList list={[]} />
        </RightPaneContainer>
        <RightPaneContainer
          title="Projects"
          footer="See all projects"
          onClickFooter={handleProjectsFooterClick}
        >
          <ProjectList list={activeProjects} />
        </RightPaneContainer>
      </div>
    </div>
  );
};

export default MainContent;
