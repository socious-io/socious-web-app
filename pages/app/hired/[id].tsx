/*
 * Individual application page for user_type="user"
 */
import {useRouter} from 'next/router';
import {GridLoader} from 'react-spinners';
import {useEffect} from 'react';

// Icons
import {ChevronLeftIcon} from '@heroicons/react/24/solid';

// hooks
import {useUser} from '@hooks';

// Components
import SideBar from '@components/common/SimpleSideBar/Sidebar';
import {GeneralLayout} from 'layout';
import type {NextPage} from 'next';
import useSWR from 'swr';
import {get} from 'utils/request';
import SplashScreen from 'layout/Splash';
import MyMission from '@components/pages/hired/MyMission';
import {IMission} from '@models/mission';

const OfferPage: NextPage = () => {
  const router = useRouter();
  const {id} = router.query;
  const {currentIdentity} = useUser();

  // Go back if it is ORG.
  useEffect(() => {
    if (currentIdentity?.type === 'organizations') router.push('/app/projects');
  }, [currentIdentity, router]);

  const {
    data: mission,
    error,
    mutate,
  } = useSWR<IMission>(id ? `/missions/${id}` : null, get);
  if (!mission && !error)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );

  if (!mission) return <SplashScreen />;

  return (
    <GeneralLayout
      hasNavbar
      hasDetailNavbar
      detailNavbarTitle={mission.project.title}
    >
      <SideBar
        title={
          <p className="flex gap-2">
            <ChevronLeftIcon className="w-5" />
            <span className="whitespace-nowrap">Back to my applications</span>
          </p>
        }
        url={`/app/applications`}
      />
      <MyMission mission={mission} mutateMission={mutate} />
    </GeneralLayout>
  );
};

export default OfferPage;
