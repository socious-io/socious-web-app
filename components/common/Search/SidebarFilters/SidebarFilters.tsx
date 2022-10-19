import Button from '@components/common/Button/Button';
import {useRouter} from 'next/router';
import {FC} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {DatePostedFilters} from './DatePostedFilters';
import {ExperienceLevelFilters} from './ExperienceLevelFilters';
import {LocationFilters} from './LocationFilters';
import {NetworkFilters} from './NetworkFilters';
import {PaymentTypeFilters} from './PaymentTypeFilters';
import {PostedbyFilters} from './PostedbyFilters';
import {ProjectLengthFilters} from './ProjectLengthFilters';
import {ProjectPostedFilters} from './ProjectPostedFilters';
import {ProjectStatusFilters} from './ProjectStatusFilters';
import {ProjectTypeFilters} from './ProjectTypeFilters';
import {SkillFilters} from './SkillFilters';
import {SocialCausesFilters} from './SocialCausesFilters';

interface SidebarFiltersProps {
  onResetFilters: () => void;
  onEditSocialCauses: () => void;
  onEditSkills: () => void;
  onEditLocation: () => void;
  onSubmit?: (data: FieldValues) => void;
}

export const SidebarFilters: FC<SidebarFiltersProps> = ({
  onSubmit,
  onResetFilters,
  onEditSocialCauses,
  onEditSkills,
  onEditLocation,
}) => {
  const methods = useForm();
  const route = useRouter();

  const onSubmitFilters = (data: FieldValues) => {
    for (let key in data) {
      let value = data[key];
      if (!value) continue;
      if (value instanceof Array) {
        value = value.join(',');
      }
      route.query[key] = value;
    }
    route.push(route);
    onSubmit?.(data);
  };

  return (
    <div
      className={`h-full overflow-auto border-l border-grayLineBased bg-offWhite`}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitFilters)}
          className="flex h-full flex-col"
        >
          <div className="flex h-14 items-center justify-between border-b border-grayLineBased px-4">
            <h3 className="text-xl">Filters</h3>
            <Button variant="ghost" onClick={onResetFilters}>
              Clear
            </Button>
          </div>
          <div className="flex-1 space-y-5 p-4">
            <SocialCausesFilters onEdit={onEditSocialCauses} />
            <hr />
            <SkillFilters onEdit={onEditSkills} />
            <hr />
            <LocationFilters onEdit={onEditLocation} />
            {/* <hr />
            <DatePostedFilters /> */}
            {/* <hr />
            <PostedbyFilters /> */}
            {/* <hr />
            <NetworkFilters /> */}
            {/* <hr />
            <ProjectPostedFilters /> */}
            {/* <hr />
            <ProjectStatusFilters /> */}
            {/* <hr />
            <ProjectLengthFilters />
            <hr />
            <ExperienceLevelFilters />
            <hr /> */}
            {/* <PaymentTypeFilters />
            <hr /> */}
            {/* <ProjectTypeFilters /> */}
          </div>
          <hr />
          <div className="flex justify-center py-3">
            <Button type="submit">Show results</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
