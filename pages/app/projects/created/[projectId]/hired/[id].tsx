import HiredContent from '@components/common/Project/created/hiredContent';
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

const Hire = () => {
  const router = useRouter();
  const {projectId, id} = router.query;
  const {data: offer, error: offerError} = useSWR<IOfferWithProject>(
    id ? `/offers/${id}` : null,
    get,
  );

  const {data: user, error: userError} = useSWR<TUserByUsername>(
    offer ? `/user/${offer.recipient_id}/profile` : null,
    get,
  );

  const {data: project} = useSWR<Project>(
    projectId ? `/projects/${projectId}` : null,
    get,
  );

  if (!offer && !offerError && !user && !offerError)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );

  // 404 || 500 || Invalid Post, redirect to home
  if (
    (offerError?.response?.status &&
      [400, 404, 500].includes(offerError.response?.status)) ||
    (userError?.response?.status &&
      [400, 404, 500].includes(userError.response?.status))
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
  if (!user) return <></>;

  return (
    <GeneralLayout>
      {/*  hasDetailNavbar detailNavbarTitle={offer.username} */}
      <SideBar selectBar={'HIRE'} data={project} />
      <HiredContent offer={offer} user={user} />
    </GeneralLayout>
  );
};

export default Hire;
