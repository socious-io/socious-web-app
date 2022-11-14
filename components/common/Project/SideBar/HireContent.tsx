import EscrowCard from '@components/organisms/escrow/EscrowCard';
import CardBoxComplete from '@components/common/CardBoxComplete/CardBoxComplete';
import {StatusListingSkeleton} from '@components/molecules/StatusListingSkeleton/StatusListingSkeleton';
import {IMission} from '@models/mission';
import {IOffer} from '@models/offer';
import {TUserByUsername} from '@models/profile';
import dayjs from 'dayjs';
import Link from 'next/link';
import useSWR from 'swr';
import {twMerge} from 'tailwind-merge';
import {get} from 'utils/request';
import {Project} from '@models/project';

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
        <StatusListingSkeleton<IOffer>
          url={
            projectId
              ? `/projects/${projectId}/offers?status=APPROVED,HIRED`
              : null
          }
          title="Hired"
          rounded
          className="border-0"
          renderList={(flattenData) => (
            <>
              {flattenData.map((offer) => (
                <EscrowWithAdditional key={offer.id} offer={offer} />
              ))}
            </>
          )}
        />
        <StatusListingSkeleton<IMission>
          url={
            projectId
              ? `/projects/${projectId}/missions?status=COMPLETE,CANCELED,KICKED_OUT`
              : null
          }
          title="End-Hired"
          className="rounded-b-2xl border-0"
          renderList={(flattenData) => (
            <>
              {flattenData.map((mission) => (
                <OfferInfoCard
                  key={mission.id}
                  offer={
                    {
                      id: mission.offer_id,
                      project_id: mission.project_id,
                      recipient_id: mission.assignee_id,
                      created_at: mission.created_at,
                    } as IOffer
                  }
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

export const OfferInfoCard = ({offer}: {offer: IOffer}) => {
  const {data: user, error} = useSWR<TUserByUsername>(
    `/user/${offer.recipient_id}/profile`,
    get,
  );

  if (!user && !error) return <p>Loading....</p>;

  if (error || !user) return <p>Error</p>;

  return (
    <Link
      href={`/app/projects/created/${offer.project_id}/hired/${offer.id}`}
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

export const EscrowWithAdditional = ({offer}: {offer: IOffer}) => {
  const {data: user, error: userError} = useSWR<TUserByUsername>(
    `/user/${offer.recipient_id}/profile`,
    get,
  );
  const {data: project, error: projectError} = useSWR<Project>(
    `/projects/${offer.project_id}`,
    get,
  );
  if ((!user && !userError) || (!project && !projectError))
    return <p>Loading....</p>;
  if (!user || !project) return <p>Error in fetch.</p>;

  return (
    <Link
      key={offer.id}
      href={`/app/projects/created/${offer.project_id}/escrow/${offer.id}`}
      passHref
    >
      <a>
        <EscrowCard offer={offer} project={project} user={user} />
      </a>
    </Link>
  );
};
