import {TApplicant, TApplicantStatus} from '@models/applicant';
import {StatusListingSkeleton} from '@components/molecules/StatusListingSkeleton/StatusListingSkeleton';
import Link from 'next/link';
import useSWR from 'swr';
import {Project} from '@models/project';
import {get} from 'utils/request';
import SplashScreen from 'layout/Splash';
import {IOffer} from '@models/offer';
import {IMission} from '@models/mission';
import BodyCard from '@components/common/Project/component/BodyCard';
import ApplicationMobileTop from '@components/organisms/applications/ApplicationMobileTop';

function UserHiredPositions() {
  return (
    <div className="w-full space-y-4">
      {/* Uncomment after Hired done */}
      <ApplicationMobileTop selectedTab="HIRED" />
      <div className="flex hidden items-center rounded-2xl border border-grayLineBased bg-white p-6 sm:block">
        <p className="text-xl font-semibold">My applications</p>
      </div>
      <div className="divide-graylineBased mb-4 h-fit w-full divide-y border border-grayLineBased md:rounded-2xl">
        <StatusListingSkeleton<IMission>
          // TODO: FIX
          // url={'/user/missions?status=ACTIVE'}
          url={'/user/missions'}
          title={'On-going'}
          rounded
          className="border-0"
          renderList={(flattenData) => (
            <>
              {flattenData.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </>
          )}
        />
        {/* TODO: Completed offers */}
        <StatusListingSkeleton<IMission>
          // TODO: FIX
          // url={'/user/missions?status=COMPLETE'}
          url={'/user/missions'}
          title={'Ended'}
          className="rounded-b-2xl border-0"
          renderList={(flattenData) => (
            <>
              {flattenData.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
}

export default UserHiredPositions;

export const MissionCard = ({mission}: {mission: IMission}) => {
  const {data: project} = useSWR<Project>(
    `/projects/${mission.project_id}`,
    get,
  );
  if (!project) return <SplashScreen />;

  return (
    <Link href={`/app/hired/${mission.id}`} passHref>
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
