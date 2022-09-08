import useSWR from 'swr';
import { useEffect, useReducer } from 'react';

import StatusCard from './StatusCard';
import NetworkCard from './NetworkCard';
import ProjectsCard from './ProjectsCard';
import ProfileCard from 'layout/screen/ProfileCard/ProfileCard';
import OrganizationCard from './OrganizationCard';
import { get } from 'utils/request';
import useUser from "hooks/useUser/useUser";

interface identity {
  created_at: string;
  current: boolean;
  id: string
  meta: {[index: string]: string};
  primary: boolean;
  type: string;
}

const SideBar = () => {
  const { data } = useSWR<any, any, any>("/api/v2/identities", get, {
    onErrorRetry: (error) => {
      if (error.response.status === 401) return
    },
    // revalidateOnFocus: false,
  });
  const { user } = useUser();

  const users = data?.map((item: any) => {
    if (item.current) return item.type === "users"
  })

  return (
    <div className="w-80" aria-label="Sidebar">
      <div className="space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ProfileCard
            content={user?.mission}
            name={user?.username}
            avatar={user?.avatar?.url}
            following={user?.following}
            followers={user?.followers}
        />
        <StatusCard status={user?.status} />
        { users ? 
          <NetworkCard />
          :
          <OrganizationCard />
        }
        <ProjectsCard isOrganization={!users} />
      </div>
    </div>
  );
};

export default SideBar;