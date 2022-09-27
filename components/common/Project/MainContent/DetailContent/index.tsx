import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import ProjectItem from '@components/common/UserProfile/MainContent/ProjectItem';
import OrganizationTopCard from '../../component/OrganizationTopCard';
import useSWR from 'swr';
import {useRouter} from 'next/router';
import {get} from 'utils/request';

const Detail = () => {
  const router = useRouter();
  const {id} = router.query;

  const {data, error} = useSWR<any>(`/projects/${id}`, get);

  if (!data && !error) return <p>loading</p>;
  if (
    error?.response?.status === 400 ||
    (500 &&
      error?.response?.data?.error.startsWith(
        'invalid input syntax for type uuid',
      ))
  )
    return <p>invalid project</p>;

  return (
    <div className="mb-10 w-full ">
      <div className="divide-y rounded-2xl border border-grayLineBased bg-white ">
        <OrganizationTopCard
          title={data?.title}
          description={data?.description} // need to ask
          country_id={data?.country}
          project_type={data?.project_type}
          project_length={data?.project_length} //  need to ask
          payment_type={data?.payment_type} // need to ask
          payment_scheme={data?.payment_scheme} // need to ask
          payment_range_lower={data?.payment_range_lower}
          payment_range_higher={data?.payment_range_higher}
          experience_level={data?.experience_level}
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
        <BodyBox
          title={'About the organization'}
          description={data?.description} // need to ask
        />
      </div>
    </div>
  );
};

export default Detail;
