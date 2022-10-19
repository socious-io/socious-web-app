import React from 'react';
import type {GetStaticProps, NextPage} from 'next';
import {GeneralLayout} from 'layout';
import getGlobalData from 'services/cacheSkills';
import {
  Skill,
  SkillsProvider,
} from '@components/common/Search/Providers/SkillsProvider';
import {MobileSearch} from '@components/common/Search/Mobile/MobileSearch';
import {DesktopSearch} from '@components/common/Search/Desktop/DesktopSearch';
import {isMobile} from 'react-device-detect';

export const getStaticProps: GetStaticProps = async () => {
  const skills = await getGlobalData();
  return {props: {skills}};
};

type SearchProps = {
  skills: Skill[];
};

const Search: NextPage<SearchProps> = ({skills}) => {
  return (
    <GeneralLayout style={{marginTop: '56px'}}>
      <SkillsProvider skills={skills}>
        {isMobile ? <MobileSearch /> : <DesktopSearch />}
      </SkillsProvider>
    </GeneralLayout>
  );
};

export default Search;
