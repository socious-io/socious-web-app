import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import ProjectItem from '@components/common/UserProfile/MainContent/ProjectItem';
import OrganizationTopCard from '../../component/OrganizationTopCard';
import useSWR from 'swr';
import {useRouter} from 'next/router';
import {get} from 'utils/request';
import {Question} from 'models/question';
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
import {CreateProjectType} from '@models/project';
import {toast} from 'react-toastify';

type CreateProjectMainType = {
  skills: any[];
};

const Detail: FC<CreateProjectMainType> = ({skills}) => {
  const router = useRouter();
  const {id} = router.query;
  const {currentIdentity} = useUser();
  const {ProjectContext, setProjectContext} = useProjectContext();
  const isStep0 = ProjectContext.formStep === 0;
  const isStep1 = ProjectContext.formStep === 1;
  const isStep2 = ProjectContext.formStep === 2;
  const {data} = useSWR<any>(`/projects/${id}`, get);
  const {data: projectQuestion} = useSWR<any>(`/projects/${id}/questions`, get);

  if (!data && !projectQuestion) return <p>loading</p>;
  const questionTitle = projectQuestion?.questions?.map(
    (q: Question) => q?.question,
  );
  const onSubmit = async () => {
    const postBody: CreateProjectType = {
      title: ProjectContext.title,
      description: ProjectContext.description,
      remote_preference: ProjectContext.remote_preference,
    };

    if (ProjectContext.experience_level)
      postBody.experience_level = ProjectContext.experience_level;
    if (ProjectContext.payment_currency)
      postBody.payment_currency = ProjectContext.payment_currency;
    if (ProjectContext.payment_range_higher)
      postBody.payment_range_higher = ProjectContext.payment_range_higher;
    if (ProjectContext.payment_range_lower)
      postBody.payment_range_lower = ProjectContext.payment_range_lower;
    if (ProjectContext.payment_scheme)
      postBody.payment_scheme = ProjectContext.payment_scheme;
    if (ProjectContext.payment_type)
      postBody.payment_type = ProjectContext.payment_type;
    if (ProjectContext.status) postBody.status = ProjectContext.status;
    if (ProjectContext.country) postBody.country = ProjectContext.country;
    if (ProjectContext.project_length)
      postBody.project_length = ProjectContext.project_length;
    if (ProjectContext.causes_tags)
      postBody.causes_tags = ProjectContext.causes_tags;
    if (ProjectContext.project_type)
      postBody.project_type = ProjectContext.project_type;
    if (ProjectContext.skills) postBody.skills = ProjectContext.skills;

    try {
      await updateProjectById(data?.id, postBody);
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
        <DetailContent
          title={data?.title}
          description={data?.description}
          country_id={data?.country}
          project_type={data?.project_type}
          project_length={data?.project_length}
          payment_type={data?.payment_type}
          payment_scheme={data?.payment_scheme}
          payment_range_lower={data?.payment_range_lower}
          payment_range_higher={data?.payment_range_higher}
          experience_level={data?.experience_level}
          remote_preference={data?.remote_preference}
          payment_currency={data?.payment_currency}
          status={data?.status}
          causes_tags={data?.causes_tags}
          skills={data?.skills}
        />
      ) : (
        <div className="divide-y rounded-2xl border border-grayLineBased bg-white ">
          <OrganizationTopCard
            title={data?.title}
            description={data?.description}
            country_id={data?.country}
            project_type={data?.project_type}
            project_length={data?.project_length}
            payment_type={data?.payment_type}
            payment_scheme={data?.payment_scheme}
            payment_range_lower={data?.payment_range_lower}
            payment_range_higher={data?.payment_range_higher}
            experience_level={data?.experience_level}
            remote_preference={data?.remote_preference}
          />
          {data?.causes_tags?.length > 0 && (
            <ProjectItem items={data?.causes_tags} title="Social causes" />
          )}
          <BodyBox
            title={'Project description'}
            description={data?.description}
          />
          {data?.skills?.length > 0 && (
            <ProjectItem title="Skills" items={data?.skills} />
          )}
          {projectQuestion?.questions?.length > 0 && (
            <ProjectItem
              title="Screening questions"
              items={questionTitle}
              isRow
            />
          )}
          <BodyBox
            title={'About the organization'}
            description={data?.description} // need to ask
          />
        </div>
      )}
      <CreateProjectLayout isEdit title="Edit Project">
        {PageDisplay()}
      </CreateProjectLayout>
    </div>
  );
};

export default Detail;
