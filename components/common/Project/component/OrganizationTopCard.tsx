import {Avatar} from '@components/common';
import {defaultProject, ProjectProps} from 'models/project';
import {Button} from '@components/common';
import {ApplyStep1} from '../Apply/Step1/ApplyStep1';
import ApplyStep2 from '../Apply/Step2/ApplyStep2';
import ApplyStep3 from '../Apply/Step3/ApplyStep3';
import ApplyStep4 from '../Apply/Step4/ApplyStep4';
import {FC} from 'react';
import useUser from 'hooks/useUser/useUser';
import {getText} from '@socious/data';
import {
  MapPinIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import {ApplyLayout} from '../MyApplication/ApplyProject';
import {useProjectContext} from '../created/NewProject/context';
import {applyProject} from '@api/projects/actions';
import {ApplyProjectType} from '@models/project';
import {toast} from 'react-toastify';

const OrganizationTopCard: FC<ProjectProps> = ({project}) => {
  const {
    title,
    country,
    identity_meta,
    payment_range_higher,
    payment_range_lower,
    remote_preference,
    project_length,
    project_type,
    id,
    applied,
  } = project;

  const {identities, currentIdentity} = useUser({redirect: false});
  const projectType = getText('en', `PROJECT.${project_type}`);
  const {ProjectContext, setProjectContext} = useProjectContext();

  const isStep0 = ProjectContext.formStep === 0;
  const isStep1 = ProjectContext.formStep === 1;
  const isStep2 = ProjectContext.formStep === 2;
  const isStep3 = ProjectContext.formStep === 3;

  const onSubmit = async () => {
    if (isStep1) {
      const postBody: ApplyProjectType = {
        cover_letter: ProjectContext.cover_letter,
      };
      if (ProjectContext.cv_link) postBody.cv_link = ProjectContext.cv_link;
      if (ProjectContext.cv_name) postBody.cv_name = ProjectContext.cv_name;
      if (ProjectContext.share_contact_info)
        postBody.share_contact_info = ProjectContext.share_contact_info;

      try {
        if (id) await applyProject(id, postBody);
        setProjectContext({
          ...ProjectContext,
          formStep: ProjectContext.formStep + 1,
        });
      } catch (error) {
        toast.error(`${error}`);
      }
    } else {
      setProjectContext({
        ...ProjectContext,
        formStep: ProjectContext.formStep + 1,
      });
    }
  };
  const pageDisplay = () => {
    if (isStep0) {
      return <ApplyStep1 onSubmit={onSubmit} project={project} />;
    } else if (isStep1) {
      return <ApplyStep2 onSubmit={onSubmit} title={title} />;
    } else if (isStep2) {
      return <ApplyStep3 />;
    } else if (isStep3) {
      return <ApplyStep4 />;
    }
  };

  const getTitle = () => {
    switch (ProjectContext.formStep) {
      case 0:
        return 'Apply';
      case 1:
        return 'Review application';
      case 2:
        return '';
      case 3:
        return 'Attach a link';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row space-x-2">
          <Avatar size="l" src={identity_meta?.image} />
          <div className="flex flex-col justify-center">
            <p className="text-black">{identity_meta?.name || ''}</p>
            <p className="text-graySubtitle">{country || ''}</p>
          </div>
        </div>
      </div>
      <div className="">
        <p className="font-semibold">{title}</p>
      </div>
      <div className="mt-4 flex space-x-5">
        {country && (
          <div className="flex flex-row">
            <MapPinIcon width={20} height={20} className="text-primary" />
            <p className="ml-2 text-sm text-graySubtitle">{country}</p>
          </div>
        )}
        {projectType && (
          <div className="flex flex-row">
            <CalendarDaysIcon width={20} height={20} className="text-primary" />
            <p className="ml-2 text-sm text-graySubtitle">{projectType}</p>
          </div>
        )}
        {(payment_range_lower || payment_range_higher) && (
          <div className="flex flex-row">
            <CurrencyDollarIcon
              width={20}
              height={20}
              className="text-primary"
            />
            <p className="pl-2 text-sm text-graySubtitle ">{`$${
              payment_range_lower || ''
            }-$${payment_range_higher || ''}`}</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex space-x-5">
        {/* <p className="pl-2 text-sm text-graySubtitle ">{experience_level}</p> */}
        {remote_preference && (
          <p className="pl-2 text-sm text-graySubtitle ">
            {getText('en', `PROJECT.${remote_preference}`)}
          </p>
        )}
        {project_length && (
          <div className="flex flex-row">
            <ClockIcon width={20} height={20} className="text-primary" />
            <p className="pl-2 text-sm text-graySubtitle">
              {getText('en', `PROJECT.${project_length}`)}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        {identities !== null && currentIdentity?.type === 'users' && (
          <Button
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            disabled={applied}
            variant="fill"
            value="Submit"
            onClick={() =>
              setProjectContext({
                ...ProjectContext,
                isApplyModalOpen: true,
                formStep: 0,
              })
            }
          >
            {applied ? 'Applied' : 'Apply now'}
          </Button>
        )}
      </div>

      <ApplyLayout title={getTitle()}>{pageDisplay()}</ApplyLayout>
    </div>
  );
};

export default OrganizationTopCard;
