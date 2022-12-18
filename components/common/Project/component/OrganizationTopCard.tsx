import {Avatar} from '@components/common';
import {ProjectProps} from 'models/project';
import {Button} from '@components/common';
import {ApplyStep1, TFormAnswer} from '../Apply/Step1/ApplyStep1';
import ApplyStep3 from '../Apply/Step3/ApplyStep3';
import {FC, useCallback, useState} from 'react';
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
import {mutate} from 'swr';
import {useFormattedLocation} from 'services/formatLocation';
import Link from 'next/link';
import RecentGallery from '../Apply/Step5/ApplyStep5';
import {checkAndUploadMedia} from 'services/ImageUpload';
import {RegisterContextProvider} from '@components/organisms/RegisterModals/RegisterContext';
import RegisterModal from '@components/organisms/RegisterModals/RegisterModal';
import LineSmall from 'asset/icons/line-small.svg';

const OrganizationTopCard: FC<ProjectProps> = ({project, questions}) => {
  const {
    title,
    identity_meta,
    payment_type,
    payment_range_higher,
    payment_range_lower,
    remote_preference,
    project_length,
    project_type,
    id,
    applied,
  } = project;
  const orgLocation = useFormattedLocation(identity_meta);
  const {identities, currentIdentity} = useUser({redirect: false});
  const projectType = getText('en', `PROJECT.${project_type}`);
  const {ProjectContext, setProjectContext} = useProjectContext();
  const location = useFormattedLocation(project);

  const [loginStep, setLoginStep] = useState<boolean>(false);
  const isStep0 = ProjectContext.formStep === 0;
  const isStep1 = ProjectContext.formStep === 1;
  const isStep2 = ProjectContext.formStep === 2;

  const mutateProject = useCallback(() => mutate(`/projects/${id}`), [id]);

  const onSubmit = async (data?: any) => {
    if (isStep0) {
      const postBody: ApplyProjectType = {
        cover_letter: ProjectContext.cover_letter,
      };
      if (ProjectContext.cv_link) postBody.cv_link = ProjectContext.cv_link;
      if (ProjectContext.cv_name) postBody.cv_name = ProjectContext.cv_name;
      if (ProjectContext.share_contact_info)
        postBody.share_contact_info = ProjectContext.share_contact_info;

      // Create answer for request.
      if (data.answers) {
        postBody.answers = data.answers
          .filter(
            (answer: TFormAnswer) =>
              answer.selected_option !== null || answer.answer,
          )
          .map((answer: TFormAnswer) => {
            let initAnswer: any = {
              id: answer.id,
            };
            if (answer.selected_option !== null)
              initAnswer = {
                ...initAnswer,
                selected_option: answer.selected_option,
              };
            if (answer.answer?.trim())
              initAnswer = {...initAnswer, answer: answer.answer};
            return initAnswer;
          });
      }
      // Attachment Check
      if (ProjectContext.attachment) {
        // return;
        try {
          const attachment = await checkAndUploadMedia(
            ProjectContext.attachment,
          );
          if (attachment) postBody.attachment = attachment;
        } catch (e) {
          console.error(e);
          return;
        }
      }

      // Applying
      try {
        if (id) await applyProject(id, postBody);
        mutateProject();
        setProjectContext({
          ...ProjectContext,
          formStep: ProjectContext.formStep + 1,
        });
      } catch (error) {
        console.log('ERRROR while applying :---: ', error);
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
      return (
        <ApplyStep1
          onSubmit={onSubmit}
          project={project}
          questions={questions}
        />
      );
    } else if (isStep1) {
      return (
        <ApplyStep3
          orgName={project.identity_meta?.name}
          projectId={project.id}
        />
      );
    } else if (isStep2) {
      return <RecentGallery />;
    }
  };

  const getTitle = () => {
    switch (ProjectContext.formStep) {
      case 0:
        return 'Apply';
      case 1:
        return '';
      case 2:
        return 'Recents';
      default:
        return '';
    }
  };

  type PaymentRange = (
    low?: string | null,
    high?: string | null,
  ) => JSX.Element;

  const paymentRange: PaymentRange = function (low, high) {
    const isOfTypeVolunteer = payment_type === 'VOLUNTEER';
    const hasTruthyValue = low && high;

    if (hasTruthyValue && !isOfTypeVolunteer) {
      return (
        <div className="flex flex-row">
          <CurrencyDollarIcon width={20} height={20} className="text-primary" />
          <p className="pl-2 text-sm text-graySubtitle ">{`$${low}-$${high} / hr`}</p>
          <img className="ml-2" src={LineSmall} alt="" />
        </div>
      );
    }
    return <></>;
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-row items-center justify-between ">
        <Link href={`/app/organization/${identity_meta.shortname}`}>
          <div className="flex cursor-pointer flex-row space-x-2">
            <Avatar size="l" src={identity_meta?.image} type="organizations" />
            <div className="flex flex-col justify-center">
              <p className="text-black">{identity_meta?.name || ''}</p>
              <p className="text-graySubtitle">{orgLocation || ''}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="">
        <Link href={`/app/projects/${id}`}>
          <p className="cursor-pointer font-semibold">{title}</p>
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {location && (
          <div className="flex flex-row">
            <MapPinIcon width={20} height={20} className="text-primary" />
            <p className="ml-2 text-sm text-graySubtitle">{location}</p>
            <img className="ml-2" src={LineSmall} alt="" />
          </div>
        )}
        {projectType && (
          <div className="flex flex-row">
            <CalendarDaysIcon width={20} height={20} className="text-primary" />
            <p className="ml-2 text-sm text-graySubtitle">{projectType}</p>
            <img className="ml-2" src={LineSmall} alt="" />
          </div>
        )}
        {paymentRange(payment_range_lower, payment_range_higher)}
        {remote_preference && (
          <div className="flex flex-row">
            <p className="text-sm text-graySubtitle">
              {getText('en', `PROJECT.${remote_preference}`)}
            </p>
            <img className="ml-2" src={LineSmall} alt="" />
          </div>
        )}
        {project_length && (
          <div className="flex flex-row">
            <ClockIcon width={20} height={20} className="text-primary" />
            <p className="ml-2 text-sm text-graySubtitle">
              {getText('en', `PROJECT.${project_length}`)}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        {((identities !== null && currentIdentity?.type === 'users') ||
          identities == null) &&
          (applied ? (
            <div className="w-full rounded-2xl bg-offWhite p-4">
              Application submitted
            </div>
          ) : (
            <Button
              className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
              type="submit"
              size="lg"
              disabled={applied}
              variant="fill"
              value="Submit"
              onClick={() =>
                identities === null
                  ? setLoginStep(true)
                  : setProjectContext({
                      ...ProjectContext,
                      isApplyModalOpen: true,
                      formStep: 0,
                    })
              }
            >
              Apply now
            </Button>
          ))}
      </div>

      <ApplyLayout title={getTitle()}>{pageDisplay()}</ApplyLayout>
      <RegisterContextProvider>
        <RegisterModal
          show={loginStep}
          onClose={() => setLoginStep(false)}
          mutateProject={mutateProject}
        />
      </RegisterContextProvider>
    </div>
  );
};

export default OrganizationTopCard;
