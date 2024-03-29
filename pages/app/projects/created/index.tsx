import React, {useEffect, useState} from 'react';
import type {NextPage} from 'next';
import {GeneralLayout} from 'layout';
import SideBar from '@components/common/Feed/SideBar';
import MyApplicationBoxes from '@components/common/Project/created';
import CreateProjectMain from '@components/common/Project/created/NewProject';
import {ProjectContextProvider} from 'components/common/Project/created/NewProject/context';
import {skillsFetcher} from 'services/cacheSkills';
import {jobCategoryFetcher} from 'services/cacheJobCategories';
import useUser from 'hooks/useUser/useUser';
import Router from 'next/router';
import {Skill} from '@components/common/Search/Providers/SkillsProvider';

const ProjectApplications: NextPage = () => {
  const {currentIdentity} = useUser({redirect: false});
  const [skills, setSkills] = useState<Skill[]>([]);
  const [jobCategories, setJobCategories] = useState<any[]>([]);

  useEffect(() => {
    if (currentIdentity?.type === 'users') Router.push('/app/projects');
  }, [currentIdentity?.type]);
  const [showCreate, setShowCreate] = useState<boolean>();

  useEffect(() => {
    skillsFetcher().then(setSkills);
    jobCategoryFetcher().then(setJobCategories);
  }, []);

  return (
    <ProjectContextProvider>
      <GeneralLayout hasNavbar>
        <SideBar />
        <MyApplicationBoxes setShowCreate={setShowCreate} />
        {showCreate && (
          <CreateProjectMain
            jobCategories={jobCategories}
            skills={skills}
            setShowCreate={setShowCreate}
          />
        )}
      </GeneralLayout>
    </ProjectContextProvider>
  );
};

export default ProjectApplications;
