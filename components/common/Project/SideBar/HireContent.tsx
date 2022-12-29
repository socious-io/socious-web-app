import CardBoxComplete from '@components/common/CardBoxComplete/CardBoxComplete';
import {StatusListingSkeleton} from '@components/organisms/StatusListingSkeleton/StatusListingSkeleton';
import {IMission} from '@models/mission';
import {IOffer} from '@models/offer';
import {TUserByUsername, UserProfile} from '@models/profile';
import dayjs from 'dayjs';
import Link from 'next/link';
import useSWR from 'swr';
import {twMerge} from 'tailwind-merge';
import {get} from 'utils/request';

type HireContentProps = {
  projectId: string;
  type?: 'FULL';
};

function HiredContent({projectId, type}: HireContentProps) {
  return (
    <div className={type === 'FULL' ? 'w-full' : 'py-4'}>
      <div
        className={twMerge(
          'my-4 divide-y divide-grayLineBased rounded-2xl border border-grayLineBased bg-white',
          type === 'FULL' && 'my-0 w-full',
        )}
      >
        <StatusListingSkeleton<IMission>
          url={
            projectId
              ? `/projects/${projectId}/missions?filter.status=ACTIVE,COMPLETE`
              : null
          }
          title={'Hired'}
          rounded
          className="border-0"
          renderList={(flattenData) => (
            <>
              {flattenData.map((mission) => (
                <OfferInfoCard
                  offer={
                    {
                      id: mission.offer_id,
                      project_id: mission.project_id,
                      recipient_id: mission.assignee_id,
                      created_at: mission.created_at,
                    } as IOffer
                  }
                  key={mission.id}
                  missionId={mission.id}
                />
              ))}
            </>
          )}
        />
        {/* TODO:// CHANGE BASED ON MISSION DESIGN (New page required.) */}
        <StatusListingSkeleton<IMission>
          url={
            projectId
              ? `/projects/${projectId}/missions?filter.status=CONFIRMED,CANCELED,KICKED_OUT`
              : null
          }
          title={'End-Hired'}
          className="rounded-b-2xl border-0"
          renderList={(flattenData) => (
            <>
              {flattenData.map((mission) => (
                <OfferInfoCard
                  offer={
                    {
                      id: mission.offer_id,
                      project_id: mission.project_id,
                      recipient_id: mission.assignee_id,
                      created_at: mission.created_at,
                    } as IOffer
                  }
                  missionId={mission.id}
                  key={mission.id}
                />
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
}

export default HiredContent;

type OfferInfoCardProps = {
  offer: IOffer;
  missionId: string;
};

export const OfferInfoCard = ({offer, missionId}: OfferInfoCardProps) => {
  const {data: user, error} = useSWR<TUserByUsername>(
    `/user/${offer.recipient_id}/profile`,
    get,
  );

  if (!user && !error) return <p>Loading....</p>;

  if (error || !user) return <p>Error</p>;

  return (
    <Link
      href={`/app/projects/created/${offer.project_id}/hired/${missionId}`}
      passHref
    >
      <a>
        <CardBoxComplete
          avatar={user.avatar?.url}
          name={user.first_name + ` ${user.last_name}`}
          username={user.username}
          applicationDate={dayjs(offer.created_at)?.format('MMM D')}
          message={'No message'}
        />
      </a>
    </Link>
  );
};
