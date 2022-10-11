import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import ProjectItem from '@components/common/UserProfile/MainContent/ProjectItem';
import OrganizationTopCard from '../../component/OrganizationTopCard';
import useSWR from 'swr';
import {useRouter} from 'next/router';
import {Question} from 'models/question';
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

type CreateProjectMainType = {
  skills: any[];
};

const Detail: FC<CreateProjectMainType> = ({skills}) => {
  const router = useRouter();
  const {id} = router.query;
  const {currentIdentity} = useUser({redirect: false});
  const {ProjectContext, setProjectContext} = useProjectContext();
  const isStep0 = ProjectContext.formStep === 0;
  const isStep1 = ProjectContext.formStep === 1;
  const isStep2 = ProjectContext.formStep === 2;
  const {data} = useSWR<Project>(`/projects/${id}`);

  // const {data: projectQuestion} = useSWR<any>(`/projects/${id}/questions`, get);

  if (!data) return <SplashScreen />;

  // const questionTitle = projectQuestion?.questions?.map(
  //   (q: Question) => q?.question,
  // );
  const onSubmit = async () => {
    const postBody: CreateProjectType = {
      title: ProjectContext.title,
      description: ProjectContext.description,
      remote_preference: ProjectContext.remote_preference,
      country: ProjectContext.country,
      project_type: ProjectContext.project_type,
      project_length: ProjectContext.project_length,
      payment_type: ProjectContext.payment_type,
      payment_range_lower: `${ProjectContext.payment_range_lower}`,
      payment_range_higher: `${ProjectContext.payment_range_higher}`,
      experience_level: ProjectContext.experience_level,
      causes_tags: ProjectContext.causes_tags,
      skills: ProjectContext.skills,
    };

    if (ProjectContext.payment_currency)
      postBody.payment_currency = ProjectContext.payment_currency;
    if (ProjectContext.payment_scheme)
      postBody.payment_scheme = ProjectContext.payment_scheme;

    try {
      await updateProjectById(data!.id, postBody);
      setProjectContext(initContext);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const PageDisplay = () => {
    if (isStep0) {
      return <ProjectInfo onSubmit={onSubmit} />;
    } else if (isStep1) {
      return <ProjectAbout onSubmit={onSubmit} />;
    } else if (isStep2) {
      return <ProjectSkill onSubmit={onSubmit} rawSkills={skills} />;
    }
  };

  return (
    <div className="mb-10 w-full ">
      {currentIdentity?.id === data?.identity_id ? (
        <DetailContent project={data} />
      ) : (
        <div className="divide-y rounded-2xl border border-grayLineBased bg-white ">
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
          {/* {projectQuestion?.questions?.length > 0 && (
            <ProjectItem
              title="Screening questions"
              items={questionTitle}
              isRow
            />
          )} */}
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
