import OfferedContent from '@components/common/Project/created/offeredContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {useUser} from '@hooks';
import {TApplicant} from '@models/applicant';
import {IOffer, IOfferWithProject} from '@models/offer';
import {TUserByUsername} from '@models/profile';
import {Project} from '@models/project';
import {identity} from 'cypress/types/lodash';
import {GeneralLayout} from 'layout';
import {useRouter} from 'next/router';
import {GridLoader} from 'react-spinners';
import useSWR from 'swr';
import {get} from 'utils/request';
import {hire, cancel} from '@api/offers/actions';

const Offer = () => {
  const router = useRouter();
  const {id} = router.query;
  const {data: offer, error: offerError} = useSWR<IOffer>(
    id ? `/offers/${id}` : null,
    get,
  );

  if (!offer && !offerError)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );

  // 404 || 500 || Invalid Post, redirect to home
  if (
    offerError?.response?.status &&
    [400, 404, 500].includes(offerError.response?.status)
  ) {
    router.push('/app/projects/created');
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
        <h3 className="pt-4">Invalid Application. Returning back.</h3>
      </div>
    );
  }

  if (!offer) return <></>;

  return (
    <GeneralLayout>
      {/*  hasDetailNavbar detailNavbarTitle={offer.username} */}
      <SideBar selectBar={'OFFER'} data={offer.project} />
      <OfferedContent offer={offer} />
    </GeneralLayout>
  );
};

export default Offer;
