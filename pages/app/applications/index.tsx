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
    <GeneralLayout hasNavbar>
      <div className="mx-6 mt-10 flex w-full md:space-x-6">
        <SideBar />
        <MyApplicationBoxes />
      </div>
    </GeneralLayout>
  );
};

export default ProjectApplications;
