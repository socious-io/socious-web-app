import React, {useEffect, useState} from 'react';
import type {NextPage} from 'next';
import {GeneralLayout} from 'layout';
import {skillsFetcher} from 'services/cacheSkills';
import {
  Skill,
  SkillsProvider,
} from '@components/common/Search/Providers/SkillsProvider';
import {MobileSearch} from '@components/common/Search/Mobile/MobileSearch';
import {DesktopSearch} from '@components/common/Search/Desktop/DesktopSearch';
import {isMobile} from 'react-device-detect';

const Search: NextPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    skillsFetcher().then(setSkills);
  }, []);

  return (
    <GeneralLayout style={{marginTop: '56px'}}>
      <SkillsProvider skills={skills}>
        {isMobile ? <MobileSearch /> : <DesktopSearch />}
      </SkillsProvider>
    </GeneralLayout>
  );
};

export default Search;
