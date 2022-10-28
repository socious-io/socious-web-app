import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import ProjectItem from '@components/common/UserProfile/MainContent/ProjectItem';
import OrganizationTopCard from '../../component/OrganizationTopCard';
import useSWR from 'swr';
import {useRouter} from 'next/router';
import {IOrganizationType} from 'models/organization';
import {useUser} from '@hooks';
import DetailContent from '@components/common/Project/created/DetailContent';
import {
  CreateProjectLayout,
  ProjectInfo,
  ProjectAbout,
  ProjectSkill,
} from '@components/common/Project/created/NewProject';
import {
  useProjectContext,
  initContext,
} from '@components/common/Project/created/NewProject/context';
import {FC} from 'react';
import {updateProjectById} from '@api/projects/actions';
import {CreateProjectType, Project} from '@models/project';
import {toast} from 'react-toastify';
import SplashScreen from 'layout/Splash';
import {twMerge} from 'tailwind-merge';
import {get} from 'utils/request';
import {Libraries, useGoogleMapsScript} from 'use-google-maps-script';
import ProjectQuestion from '../../created/NewProject/ProjectQuestions';
import QuestionDetail from '../../created/NewProject/QuestionDetail';
import {TQuestionsResponse} from '@models/question';

type CreateProjectMainType = {
  projectId?: string;
  className?: string;
  skills: any[];
};

const libraries: Libraries = ['places'];

const Detail: FC<CreateProjectMainType> = ({projectId, className, skills}) => {
  const {isLoaded} = useGoogleMapsScript({
    googleMapsApiKey: process.env['NEXT_PUBLIC_GOOGLE_API_KEY'] ?? '',
    libraries,
  });

  const router = useRouter();
  const {id} = router.query;
  const {currentIdentity} = useUser({redirect: false});
  const {ProjectContext, setProjectContext} = useProjectContext();
  const isStep0 = ProjectContext.formStep === 0;
  const isStep1 = ProjectContext.formStep === 1;
  const isStep2 = ProjectContext.formStep === 2;
  const isStep3 = ProjectContext.formStep === 3;
  const isStep4 = ProjectContext.formStep === 4;

  // const {data: projectQuestion} = useSWR<any>(`/projects/${id}/questions`, get);
  const {data, mutate} = useSWR<Project>(`/projects/${projectId ?? id}`, get);
  const {mutate: getProject} = useSWR<any>(
    `/projects?identity=${currentIdentity?.id}`,
    get,
  );

  const {
    data: questions,
    error: questionsError,
    mutate: mutateQuestions,
  } = useSWR<TQuestionsResponse>(
    data?.id ? `/projects/${data.id}/questions` : null,
    get,
  );
  if (!data) return <SplashScreen />;

  const onSubmit = async (s?: 'DRAFT' | 'EXPIRE' | 'ACTIVE') => {
    const postBody: CreateProjectType = {
      title: ProjectContext.title,
      description: ProjectContext.description,
      remote_preference: ProjectContext.remote_preference,
      country: ProjectContext.country,
      project_type: ProjectContext.project_type,
      project_length: ProjectContext.project_length,
      payment_type: ProjectContext.payment_type,
      causes_tags: ProjectContext.causes_tags,
      skills: ProjectContext.skills,
      status: s ? s : ProjectContext.status,
      experience_level: ProjectContext.experience_level,
    };

    if (ProjectContext.payment_currency)
      postBody.payment_currency = ProjectContext.payment_currency;
    if (ProjectContext.city) postBody.city = ProjectContext.city;

    if (ProjectContext.payment_scheme) {
      postBody.payment_scheme = ProjectContext.payment_scheme;
      if (postBody.payment_scheme === 'HOURLY') {
        if (ProjectContext.commitment_hours_higher)
          postBody.commitment_hours_higher =
            ProjectContext.commitment_hours_higher;
        if (ProjectContext.commitment_hours_lower)
          postBody.commitment_hours_lower =
            ProjectContext.commitment_hours_lower;
      }
    }

    if (postBody.payment_type === 'PAID') {
      if (ProjectContext.payment_range_lower)
        postBody.payment_range_lower = ProjectContext.payment_range_lower;
      if (ProjectContext.payment_range_higher)
        postBody.payment_range_higher = ProjectContext.payment_range_higher;
    }

    try {
      await updateProjectById(data!.id, postBody);
      mutate();
      getProject();
      setProjectContext(initContext);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const PageDisplay = () => {
    if (isStep0 && isLoaded) {
      return <ProjectInfo onSubmit={onSubmit} />;
    } else if (isStep1) {
      return <ProjectAbout onSubmit={onSubmit} />;
    } else if (isStep2) {
      return <ProjectSkill onSubmit={onSubmit} rawSkills={skills} />;
    } else if (isStep3) {
      return <ProjectQuestion onSubmit={onSubmit} type="EDIT" />;
    } else if (isStep4) {
      return <QuestionDetail projectId={data.id} />;
    }
  };

  return (
    <div className="mb-10 w-full ">
      {currentIdentity?.id === data?.identity_id ? (
        <DetailContent project={data} questions={questions?.questions} />
      ) : (
        <div
          className={twMerge(
            'divide-y rounded-2xl border border-grayLineBased bg-white ',
            className,
          )}
        >
          <OrganizationTopCard project={data} />
          {(data?.causes_tags || []).length > 0 && (
            <ProjectItem items={data?.causes_tags} title="Social causes" />
          )}
          <BodyBox
            title={'Project description'}
            description={data?.description}
          />
          {data?.skills?.length > 0 && (
            <ProjectItem title="Skills" items={data?.skills} />
          )}

          {data?.identity_id && (
            <OrganizationAbout organizationId={data.identity_id} />
          )}
        </div>
      )}
      <CreateProjectLayout isEdit title="Edit Project">
        {PageDisplay()}
      </CreateProjectLayout>
    </div>
  );
};

function OrganizationAbout({organizationId}: {organizationId: string}) {
  const {data} = useSWR<IOrganizationType>(`/orgs/${organizationId}`);
  if (!data?.description) return <></>;

  return (
    <BodyBox title={'About the organization'} description={data.description} />
  );
}
export default Detail;
