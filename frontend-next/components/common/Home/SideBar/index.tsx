import useSWR from 'swr';
import {useEffect, useReducer} from 'react';

import StatusCard from './StatusCard';
import NetworkCard from './NetworkCard';
import ProjectsCard from './ProjectsCard';
import ProfileCard from 'layout/screen/ProfileCard/ProfileCard';
import OrganizationCard from './OrganizationCard';
import {get} from 'utils/request';
import useUser from 'hooks/useUser/useUser';

import {Dropdown} from '@components/common/Dropdown/Dropdown';
import Avatar from '@components/common/Avatar/Avatar';
import {LoginIdentity} from '@models/identity';
import {changeIdentity} from '@api/identity/actions';

const SideBar = () => {
  const {data} = useSWR<any, any, any>('/identities', get, {
    onErrorRetry: (error) => {
      if (error?.response?.status === 401) return;
    },
    // revalidateOnFocus: false,
  });

  const {user} = useUser();

  const currentIdentity = identities?.find(
    (ident: LoginIdentity) => ident.current,
  );

  const {data: org} = useSWR<any, any, any>(
    currentIdentity?.type === 'organizations'
      ? `/api/v2/orgs/${currentIdentity?.id}`
      : null,
    get,
    {
      onErrorRetry: (error) => {
        if (error?.response?.status === 401) return;
      },
      // revalidateOnFocus: false,
    },
  );

  return (
    <div className="w-80" aria-label="Sidebar">
      <div className="space-y-4 overflow-y-auto bg-gray-50">
        <ProfileCard
          content={
            currentIdentity?.type === 'users' ? user?.mission : org?.mission
          }
          name={currentIdentity?.type === 'users' ? user?.username : org?.name}
          avatar={
            currentIdentity?.type === 'users'
              ? user?.avatar?.url
              : org?.image?.url
          }
          following={
            currentIdentity?.type === 'users' ? user?.following : org?.following
          }
          followers={
            currentIdentity?.type === 'users' ? user?.followers : org?.followers
          }
        />
        <StatusCard status={user?.status} />
        {currentIdentity?.type === 'users' ? (
          <NetworkCard />
        ) : (
          <OrganizationCard />
        )}
        <ProjectsCard
          isOrganization={currentIdentity?.type === 'organizations'}
        />
      </div>
    </div>
  );
};

export default SideBar;
