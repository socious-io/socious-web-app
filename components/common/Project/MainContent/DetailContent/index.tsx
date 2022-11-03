import {twMerge} from 'tailwind-merge';
import {FC} from 'react';
import useSWR, {KeyedMutator} from 'swr';

// Components
import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import ProjectItem from '@components/common/UserProfile/MainContent/ProjectItem';
import OrganizationTopCard from '../../component/OrganizationTopCard';
import DetailContent from '@components/common/Project/created/DetailContent';
import SplashScreen from 'layout/Splash';

// Hooks/ Utils
import {useUser} from '@hooks';
import {get} from 'utils/request';

// Types
import {TQuestionsResponse} from '@models/question';
import {IOrganizationType} from 'models/organization';
import {Project} from '@models/project';
type CreateProjectMainType = {
  projectId: string;
  skills: any[];
  className?: string;
  data: {data: Project; mutate: KeyedMutator<Project>};
};

const Detail: FC<CreateProjectMainType> = (props) => {
  const {className, skills} = props;
  /* @desc: data will always be present in this component, so casting is safe */
  const {data, mutate} = props.data as NonNullable<
    CreateProjectMainType['data']
  >;

  const {currentIdentity} = useUser({redirect: false});

  const {data: questions} = useSWR<TQuestionsResponse>(
    data.id ? `/projects/${data.id}/questions` : null,
    get,
  );

  if (!data) return <SplashScreen />;

  return (
    <div className="mb-10 w-full ">
      {currentIdentity?.id === data?.identity_id ? (
        <DetailContent
          project={data}
          rawSkills={skills}
          questions={questions?.questions?.sort(
            (x, y) => Date.parse(x.created_at) - Date.parse(y.created_at),
          )}
        />
      ) : (
        <div
          className={twMerge(
            'divide-y rounded-2xl border border-grayLineBased bg-white ',
            className,
          )}
        >
          <OrganizationTopCard
            project={data}
            questions={questions?.questions?.sort(
              (x, y) => Date.parse(x.created_at) - Date.parse(y.created_at),
            )}
          />
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
