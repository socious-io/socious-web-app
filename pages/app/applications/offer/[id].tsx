/*
 * Individual application page for user_type="user"
 */
import {useRouter} from 'next/router';
import {GridLoader} from 'react-spinners';
import {useEffect} from 'react';

// Icons
import {ChevronLeftIcon} from '@heroicons/react/24/solid';

// hooks
import {useUser, useApplication} from '@hooks';

// Components
import SideBar from '@components/common/SimpleSideBar/Sidebar';
import {GeneralLayout} from 'layout';
import type {NextPage} from 'next';
import MyOffer from '@components/pages/offer/MyOffer';
import useSWR from 'swr';
import {get} from 'utils/request';
import SplashScreen from 'layout/Splash';
import {GlobalResponseType} from '@models/organization';
import {IOffer} from '@models/offer';

const OfferPage: NextPage = () => {
  const router = useRouter();
  const {id} = router.query;
  const {currentIdentity} = useUser();

  // Go back if it is ORG.
  useEffect(() => {
    if (currentIdentity?.type === 'organizations') router.push('/app/projects');
  }, [currentIdentity, router]);

  // NOTE: temporary solution until offers/:id is working correctly
  const {data, error, mutate} = useSWR<GlobalResponseType<IOffer>>(
    id ? `/user/offers?filter.project_id=${id}` : null,
    get,
  );
  if (!data && !error)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );

  if (!data) return <SplashScreen />;

  return (
    <GeneralLayout hasNavbar>
      <SideBar
        title={
          <p className="flex gap-2">
            <ChevronLeftIcon className="w-5" />
            <span className="whitespace-nowrap">Back to my applications</span>
          </p>
        }
        url={`/app/applications`}
      />
      <MyOffer offer={data?.items[0]} mutateOffer={mutate} />
    </GeneralLayout>
  );
};

export default OfferPage;
