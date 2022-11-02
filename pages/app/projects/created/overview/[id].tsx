import DetailContent from '@components/common/Project/created/DetailContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {GeneralLayout} from 'layout';
import {useRouter} from 'next/router';
import {get} from 'utils/request';
import useSWR from 'swr';
import SplashScreen from 'layout/Splash';

const Overview = () => {
  const router = useRouter();
  const {id} = router.query;
  const {data} = useSWR<any>(`/projects/${id}`, get);
  if (!data) return <SplashScreen />;

  return (
    <GeneralLayout hasNavbar>
      <SideBar data={data} />
      <DetailContent project={data} />
    </GeneralLayout>
  );
};

export default Overview;
