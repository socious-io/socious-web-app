import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import ProjectItem from '@components/common/UserProfile/MainContent/ProjectItem';
import OrganizationTopCard from '../../component/OrganizationTopCard';
import useSWR from 'swr';
import {useRouter} from 'next/router';
import {get} from 'utils/request';
import {Question} from 'models/question';

const Detail = () => {
  const router = useRouter();
  const {id} = router.query;

  const {data} = useSWR<any>(`/projects/${id}`, get);
  const {data: projectQuestion} = useSWR<any>(`/projects/${id}/questions`, get);

  if (!data && !projectQuestion) return <p>loading</p>;
  console.log('*********');
  console.log(projectQuestion);
  console.log(projectQuestion?.questions?.length > 0);
  console.log('*********');
  const questionTitle = projectQuestion?.questions?.map(
    (q: Question) => q?.question,
  );

  return (
    <div className="mb-10 w-full ">
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
    </div>
  );
};

export default Detail;
