import DetailContent from '@components/common/Project/MainContent/DetailContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {GeneralLayout, DetailLayout} from 'layout';
import {ProjectContextProvider} from 'components/common/Project/created/NewProject/context';
import {skillsFetcher} from 'services/cacheSkills';
import type {NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {get} from 'utils/request';
import {Project} from '@models/project';
import {Skill} from '@components/common/Search/Providers/SkillsProvider';

const Detail: NextPage = () => {
  const router = useRouter();
  const {id} = router.query;
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    skillsFetcher().then(setSkills);
  }, []);

  const {data} = useSWR<Project>(`/projects/${id}`, get);

  if (!data) {
    return <>..</>;
  }

  return (
    <ProjectContextProvider>
      <GeneralLayout hasDetailNavbar detailNavbarTitle="Project details">
        <SideBar data={data} projectId={data.id} />
        <DetailLayout>
          <DetailContent data={data} skills={skills} projectId={data.id} />
        </DetailLayout>
      </GeneralLayout>
    </ProjectContextProvider>
  );
};

export default Detail;
