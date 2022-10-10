import {FC} from 'react';
import {useRouter} from 'next/router';
import {AllFilters} from './AllFilters';
import {DatePostedDropdown} from './DatePostedDropdown';
import {PostedByDropdown} from './PostedByDropdown';
import {ResetFilters} from './ResetFilters';
import {SearchTypesDropdown} from './SearchTypesDropdown';
import {SocialCausesDropdown} from './SocialCausesDropdown';
import {SkillsDropdown} from './SkillsDropdown';
import {LocationDropdown} from './LocationDropdown';
import {PaymentTypeDropdown} from './PaymentTypeDropdown';
import {ProjectsDropdown} from './ProjectsDropdown';
import {OrganizationTypeDropdown} from './OrganizationTypeDropdown';
import {ProjectTypeDropdown} from './ProjectTypeDropdown';
import {FieldValues} from 'react-hook-form';

interface TopbarFiltersProps {
  onToggleAllFilters: () => void;
  onResetFilters: () => void;
  onShowSocialCausesModal: () => void;
  onShowSkillsModal: () => void;
  onShowLocationModal: () => void;
}

export const TopbarFilters: FC<TopbarFiltersProps> = ({
  onToggleAllFilters,
  onResetFilters,
  onShowSocialCausesModal,
  onShowSkillsModal,
  onShowLocationModal,
}) => {
  const route = useRouter();
  const {type = ''} = route.query;

  const changeSearchType = (type: string) => {
    delete route.query.page;
    delete route.query.preview_id;
    updateRoute('type', type);
  };

  const changeDatePosted = (date: string) => {
    updateRoute('date_posted', date);
  };

  const changePostedBy = (postedBy: string[]) => {
    updateRoute('posted_by', postedBy.join(','));
  };

  const changeUserType = (type: string) => {
    updateRoute('user_type', type);
  };

  const changePaymentType = (values: FieldValues) => {
    console.log(values);
    updateRoute('payment_type', values.payment_type.join(','));
  };

  const changeProjects = (project: string) => {
    updateRoute('projects', project);
  };

  const changeProjectType = (type: string) => {
    updateRoute('project_type', type);
  };

  const changeOrganizationType = (orgType: string) => {
    updateRoute('organization_type', orgType);
  };

  const updateRoute = (param: string, value: string | string[]) => {
    route.query[param] = value;
    route.push(route);
  };

  const renderFilters = () => {
    switch (type) {
      case 'posts':
        return (
          <>
            {/* <DatePostedDropdown onChange={changeDatePosted} /> */}
            <SocialCausesDropdown onClick={onShowSocialCausesModal} />
            {/* <PostedByDropdown onChange={changePostedBy} /> */}
          </>
        );
      case 'users':
        return (
          <>
            <SocialCausesDropdown onClick={onShowSocialCausesModal} />
            <SkillsDropdown onClick={onShowSkillsModal} />
            <LocationDropdown onClick={onShowLocationModal} />
            {/* <PaymentTypeDropdown onChange={changePaymentType} /> */}
          </>
        );
      case 'organizations':
        return (
          <>
            <SocialCausesDropdown onClick={onShowSocialCausesModal} />
            <LocationDropdown onClick={onShowLocationModal} />
            {/* <ProjectsDropdown onChange={changeProjects} /> */}
            {/* <OrganizationTypeDropdown onChange={changeOrganizationType} /> */}
          </>
        );
      case 'projects':
        return (
          <>
            {/* <DatePostedDropdown onChange={changeDatePosted} /> */}
            <SocialCausesDropdown onClick={onShowSocialCausesModal} />
            <SkillsDropdown onClick={onShowSkillsModal} />
            {/* <ProjectTypeDropdown onChange={changeProjectType} /> */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed left-0 top-14 z-10 flex h-14 w-full items-center justify-center border-b border-grayLineBased bg-white md:top-16 md:justify-start">
      <div className="container mx-6 flex w-full max-w-5xl items-center gap-2 overflow-x-auto px-4 sm:mx-2 md:mx-auto md:justify-center md:overflow-x-visible md:px-0">
        <SearchTypesDropdown
          seletedType={type.toString()}
          onChange={changeSearchType}
        />
        {renderFilters()}
        <AllFilters onClick={onToggleAllFilters} />
        <ResetFilters onClick={onResetFilters} />
      </div>
    </div>
  );
};
