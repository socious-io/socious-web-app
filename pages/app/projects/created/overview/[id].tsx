import DetailContent from '@components/common/Project/created/DetailContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {GeneralLayout} from 'layout';
import {useRouter} from 'next/router';
import {get} from 'utils/request';
import useSWR from 'swr';

const Overview = () => {
  const router = useRouter();
  const {id} = router.query;
  const {data} = useSWR<any>(`/projects/${id}`, get);

  return (
    <GeneralLayout hasNavbar>
      <SideBar selectBar={'REVIEW'} />
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
      />
    </GeneralLayout>
  );
};

export default Overview;
