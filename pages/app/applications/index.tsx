/*
 * user projects page with dynamik route
 */

import React, {useEffect} from 'react';
import type {NextPage} from 'next';

//components
import {GeneralLayout} from 'layout';
import MyApplicationBoxes from '@components/common/Project/MyApplication';
import SideBar from '@components/common/Feed/SideBar';
import {useUser} from '@hooks';
import {useRouter} from 'next/router';

const ProjectApplications: NextPage = () => {
  const router = useRouter();
  const {currentIdentity} = useUser();

  // Go back if it is ORG.
  useEffect(() => {
    if (currentIdentity?.type === 'organizations') router.push('/app/projects');
  }, [currentIdentity, router]);

  return (
    <GeneralLayout hasNavbar hasDetailNavbar detailNavbarTitle="My projects">
      <div className="flex w-full md:mt-10 md:space-x-6">
        <SideBar />
        <MyApplicationBoxes />
      </div>
    </GeneralLayout>
  );
};

export default ProjectApplications;
