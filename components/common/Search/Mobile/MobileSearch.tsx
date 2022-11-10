import {useToggle} from '@hooks';
import {DetailLayout} from 'layout';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {SearchResults} from '../Results/SearchResults';
import {BottomSheet} from 'react-spring-bottom-sheet';
import {SidebarFilters} from '../SidebarFilters/SidebarFilters';
import {SocialCausesForm} from '../Modal/SocialCausesForm';
import {SkillsForm} from '../Modal/SkillsForm';
import {MobileTopbarFilters} from './MobileTopbarFilters';
import {SearchResultPreview} from '../Preview/Preview';
import {PostedByOptions} from '../TopbarFilters/PostedByDropdown';
import {DatePostedOptions} from '../TopbarFilters/DatePostedDropdown';
import {SearchTypeOptions} from '../TopbarFilters/SearchTypesDropdown';
import {PaymentTypeForm} from '../TopbarFilters/PaymentTypeDropdown';
import {ProjectTypeOptions} from '../TopbarFilters/ProjectTypeDropdown';
import {OrganizationTypeOptions} from '../TopbarFilters/OrganizationTypeDropdown';
import {ProjectOptions} from '../TopbarFilters/ProjectsDropdown';
import {FieldValues} from 'react-hook-form';
import {LocationForm} from '../TopbarFilters/LocationForm';
import {SocialCausesModal} from '../Modal/SocialCausesModal';
import {SkillsModal} from '../Modal/SkillsModal';
import {LocationModal} from '../Modal/LocationModal';
import {SortOptions} from '../Results/SortDropdown';

export const MobileSearch = () => {
  const {state: showBottomSheet, handlers: bottomSheetHandler} = useToggle();
  const [bottomSheetType, setBottomSheetType] = useState<string>();
  const route = useRouter();
  const {type = '', preview_id = ''} = route.query;

  useEffect(() => {
    function showResultPreview() {
      if (preview_id) {
        setBottomSheetType('preview');
        bottomSheetHandler.on();
      }
    }

    showResultPreview();
  }, [preview_id, bottomSheetHandler]);

  const resetFilters = () => {
    route.query = {
      type: route.query.type,
      keywords: route.query.keywords,
    };
    route.push(route);
  };

  const updateRoute = (param: string, value: string) => {
    route.query[param] = value;
    route.push(route);
  };

  const renderBottomSheetContent = () => {
    switch (bottomSheetType) {
      case 'search_types':
        return (
          <SearchTypeOptions
            onChange={(value) => {
              updateRoute('type', value);
              bottomSheetHandler.off();
            }}
          />
        );
      case 'all_filters':
        return (
          <SidebarFilters
            onResetFilters={resetFilters}
            onSubmit={bottomSheetHandler.off}
            onEditSocialCauses={() => setBottomSheetType('social_causes')}
            onEditSkills={() => setBottomSheetType('skills')}
            onEditLocation={() => setBottomSheetType('locations')}
          />
        );
      case 'date_posted':
        return (
          <DatePostedOptions
            onChange={(value) => {
              updateRoute('date_posted', value);
              bottomSheetHandler.off();
            }}
          />
        );
      case 'posted_by':
        return (
          <PostedByOptions
            onSubmit={(data) => {
              updateRoute('posted_by', data.join(','));
              bottomSheetHandler.off();
            }}
          />
        );
      case 'social_causes':
        return <SocialCausesForm onSubmit={bottomSheetHandler.off} />;
      case 'skills':
        return <SkillsForm onSubmit={bottomSheetHandler.off} />;
      case 'payment_type':
        return (
          <PaymentTypeForm
            onSubmit={(values) => {
              updateRoute('payment_type', values.payment_type.join(','));
              bottomSheetHandler.off();
            }}
          />
        );
      case 'project_type':
        return (
          <ProjectTypeOptions
            onChange={(value) => {
              updateRoute('project_type', value);
              bottomSheetHandler.off();
            }}
          />
        );
      case 'organization_type':
        return (
          <OrganizationTypeOptions
            onChange={(value) => {
              updateRoute('org_type', value);
              bottomSheetHandler.off();
            }}
          />
        );
      case 'locations':
        return (
          <LocationForm
            className="h-screen"
            onSubmit={(values: FieldValues) => {
              updateRoute('country', values.country);
              updateRoute('city', values.city);
              bottomSheetHandler.off();
            }}
          />
        );
      case 'projects':
        return (
          <ProjectOptions
            onChange={(value) => {
              updateRoute('project', value);
              bottomSheetHandler.off();
            }}
          />
        );
      case 'preview':
        return (
          <SearchResultPreview
            type={type.toString()}
            id={preview_id.toString()}
            className="h-screen"
          />
        );
      case 'sort':
        return (
          <SortOptions
            onChange={(value) => {
              updateRoute('sort', value);
              bottomSheetHandler.off();
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <MobileTopbarFilters
        onShowFilter={(filterType: string) => {
          setBottomSheetType(filterType);
          bottomSheetHandler.on();
        }}
        onResetFilters={resetFilters}
      />
      <DetailLayout>
        <SearchResults
          onChangeSortType={() => {
            setBottomSheetType('sort');
            bottomSheetHandler.on();
          }}
        />
      </DetailLayout>
      <BottomSheet open={showBottomSheet} onDismiss={bottomSheetHandler.off}>
        {renderBottomSheetContent()}
      </BottomSheet>
    </>
  );
};
