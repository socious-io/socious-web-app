import {useToggle} from '@hooks';
import {DetailLayout} from 'layout';
import {useRouter} from 'next/router';
import {FC, useEffect} from 'react';
import {SkillsModal} from '../Modal/SkillsModal';
import {SocialCausesModal} from '../Modal/SocialCausesModal';
import {SearchResults} from '../Results/SearchResults';
import {DesktopSidebar} from './DesktopSidebar';
import {TopbarFilters} from '../TopbarFilters/TopbarFilters';
import {LocationModal} from '../Modal/LocationModal';

export const DesktopSearch: FC = () => {
  const {state: showSidebarFilters, handlers: sidebarHandler} = useToggle();
  const {state: showSocialCausesModal, handlers: socialCausesHandler} =
    useToggle();
  const {state: showSkillsModal, handlers: skillsHanlder} = useToggle();
  const {state: showLocationModal, handlers: locationHander} = useToggle();
  const route = useRouter();
  const {type} = route.query;

  useEffect(() => {
    if (type === 'posts') sidebarHandler.on();
  }, [sidebarHandler, type]);

  const resetFilters = () => {
    route.query = {
      type: route.query.type,
      keywords: route.query.keywords,
    };
    route.push(route);
  };

  return (
    <>
      <TopbarFilters
        allFilterOpen={showSidebarFilters}
        onToggleAllFilters={sidebarHandler.toggle}
        onResetFilters={resetFilters}
        onShowSocialCausesModal={socialCausesHandler.on}
        onShowSkillsModal={skillsHanlder.on}
        onShowLocationModal={locationHander.on}
      />
      <DetailLayout>
        <SearchResults closeFilter={sidebarHandler.off} />
      </DetailLayout>
      <DesktopSidebar
        showSidebarFilters={showSidebarFilters}
        onResetFilters={resetFilters}
        onEditSocialCauses={socialCausesHandler.on}
        onEditSkills={skillsHanlder.on}
        onEditLocation={locationHander.on}
      />
      <SocialCausesModal
        isOpen={showSocialCausesModal}
        onClose={socialCausesHandler.off}
      />
      <SkillsModal isOpen={showSkillsModal} onClose={skillsHanlder.off} />
      <LocationModal isOpen={showLocationModal} onClose={locationHander.off} />
    </>
  );
};
