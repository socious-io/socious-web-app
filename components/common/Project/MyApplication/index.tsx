import BodyCard from '../component/BodyCard';
import HeaderBox from '../component/HeaderBox';
import {useToggle} from '@hooks';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';
import {TApplicant, TApplicantStatus} from '@models/applicant';
import Button from '@components/common/Button/Button';
import {StatusListingSkeleton} from '@components/molecules/StatusListingSkeleton/StatusListingSkeleton';
import Link from 'next/link';
import useSWR from 'swr';
import {Project} from '@models/project';
import {get} from 'utils/request';
import SplashScreen from 'layout/Splash';
import {IOffer} from '@models/offer';

interface StatusApplicationsProps {
  name: any;
  // group: Array<TApplicant> | undefined;
  status: TApplicantStatus;
  position?: 'FIRST' | 'LAST';
}

function StatusApplications({name, status, position}: StatusApplicationsProps) {
  const {state: expandState, handlers: expandHandler} = useToggle();

  const {flattenData, loadMore, seeMore, totalCount} =
    useInfiniteSWR<TApplicant>(`/user/applicants?status=${status}`);

  return (
    <>
      <HeaderBox
        title={`${name} (${totalCount})`}
        isExpand={expandState}
        expandToggle={expandHandler.toggle}
        isExpandable={Boolean(flattenData?.length)}
        isRound={false}
        className={`border-0 ${
          position === 'LAST'
            ? 'md:rounded-b-2xl'
            : position == 'FIRST'
            ? 'rounded-t-0 md:rounded-t-2xl'
            : ''
        }`}
      />
      {expandState && (
        <div>
          {flattenData?.map((item) => (
            <Link href={`/app/applications/${item.id}`} passHref key={item.id}>
              <a>
                <BodyCard
                  project={item.project}
                  name={item.organization.meta.name}
                  image={item.organization.meta.image}
                />
              </a>
            </Link>
          ))}
          {seeMore && (
            <div className="mb-4 flex justify-center">
              <Button
                variant="link"
                className="font-semibold text-primary"
                onClick={loadMore}
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function MyApplicationBoxes() {
  return (
    <div className="w-full space-y-4">
      {/* Uncomment after Hired done */}
      {/* <ApplicationMobileTop selectedTab="APPLICATION" /> */}
      <div className="flex hidden items-center rounded-2xl border border-grayLineBased bg-white p-6 sm:block">
        <p className="text-xl font-semibold">My applications</p>
      </div>
      <div className="divide-graylineBased mb-4 h-fit w-full divide-y border border-grayLineBased md:rounded-2xl">
        <StatusApplications name="Pending" status="PENDING" position="FIRST" />
        <StatusListingSkeleton<IOffer>
          url={'/user/offers?status=PENDING'}
          title={'Awaiting review'}
          className="border-0"
          renderList={(flattenData) => (
            <>
              {flattenData.map((offer) => (
                <OfferedCard key={offer.id} offer={offer} />
              ))}
            </>
          )}
        />
        {/* TODO: Rejected offers */}
        <StatusListingSkeleton<IOffer>
          url={'/user/offers?status=WITHDRAWN'}
          title={'Awaiting review'}
          className="rounded-b-2xl border-0"
          renderList={(flattenData) => (
            <>
              {flattenData.map((offer) => (
                <OfferedCard key={offer.id} offer={offer} />
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
}

export default MyApplicationBoxes;

const OfferedCard = ({offer}: {offer: IOffer}) => {
  const {data: project} = useSWR<Project>(`/projects/${offer.project_id}`, get);
  if (!project) return <SplashScreen />;

  return (
    // NOTE: temporary solution until offers/:id is working correctly
    // <Link href={`/app/applications/offer/${offer.id}`} passHref>
    <Link href={`/app/applications/offer/${offer.project_id}`} passHref>
      <a>
        <BodyCard
          project={project}
          name={project.identity_meta.name}
          image={project.identity_meta.image}
        />
      </a>
    </Link>
  );
};
