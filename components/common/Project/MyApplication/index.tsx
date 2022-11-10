import BodyCard from '../component/BodyCard';
import {TApplicant, TApplicantStatus} from '@models/applicant';
import {StatusListingSkeleton} from '@components/molecules/StatusListingSkeleton/StatusListingSkeleton';
import Link from 'next/link';
import useSWR from 'swr';
import {Project} from '@models/project';
import {get} from 'utils/request';
import SplashScreen from 'layout/Splash';
import {IOffer} from '@models/offer';
import ApplicationMobileTop from '@components/organisms/applications/ApplicationMobileTop';

function MyApplicationBoxes() {
  return (
    <div className="w-full space-y-4">
      <ApplicationMobileTop selectedTab="APPLICATION" />
      <div className="flex hidden items-center rounded-2xl border border-grayLineBased bg-white p-6 sm:block">
        <p className="text-xl font-semibold">My applications</p>
      </div>
      <div className="divide-graylineBased mb-4 h-fit w-full divide-y border border-grayLineBased md:rounded-2xl">
        <StatusListingSkeleton<TApplicant>
          url={'/user/applicants?status=PENDING'}
          title={'Pending'}
          rounded
          className="border-0"
          renderList={(flattenData) => (
            <>
              {flattenData.map((applicant) => (
                <Link
                  href={`/app/applications/${applicant.id}`}
                  passHref
                  key={applicant.id}
                >
                  <a>
                    <BodyCard
                      project={applicant.project}
                      name={applicant.organization.meta.name}
                      image={applicant.organization.meta.image}
                    />
                  </a>
                </Link>
              ))}
            </>
          )}
        />
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
          title={'Declined'}
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

export const OfferedCard = ({offer}: {offer: IOffer}) => {
  const {data: project} = useSWR<Project>(`/projects/${offer.project_id}`, get);
  if (!project) return <SplashScreen />;

  return (
    <Link href={`/app/applications/offer/${offer.id}`} passHref>
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
