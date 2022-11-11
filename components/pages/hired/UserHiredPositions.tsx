import {StatusListingSkeleton} from '@components/molecules/StatusListingSkeleton/StatusListingSkeleton';
import Link from 'next/link';
import {IInfiniteMission} from '@models/mission';
import BodyCard from '@components/common/Project/component/BodyCard';
import ApplicationMobileTop from '@components/organisms/applications/ApplicationMobileTop';

function UserHiredPositions() {
  return (
    <div className="w-full space-y-4">
      <ApplicationMobileTop selectedTab="HIRED" />
      <div className="!mt-0 flex hidden items-center rounded-2xl border border-grayLineBased bg-white p-6 sm:block">
        <p className="text-xl font-semibold">Hired projects</p>
      </div>
      <div className="divide-graylineBased mb-4 h-fit w-full divide-y border border-grayLineBased md:rounded-2xl">
        <StatusListingSkeleton<IInfiniteMission>
          url={'/user/missions?status=ACTIVE'}
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
        <StatusListingSkeleton<IInfiniteMission>
          url={'/user/missions?status=COMPLETE,CONFIRMED'}
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

export const MissionCard = ({mission}: {mission: IInfiniteMission}) => {
  return (
    <Link href={`/app/hired/${mission.id}`} passHref>
      <a>
        <BodyCard
          project={{
            ...mission.project,
            identity_meta: mission.assigner.meta,
          }}
          name={mission.assigner.meta.name}
          image={mission.assigner.meta.image}
        />
      </a>
    </Link>
  );
};
