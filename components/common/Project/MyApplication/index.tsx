import BodyCard from '../component/BodyCard';
import HeaderBox from '../component/HeaderBox';
import {useToggle} from '@hooks';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';
import {TApplicant, TApplicantStatus} from '@models/applicant';
import {useEffect, useMemo} from 'react';

interface StatusApplicationsProps {
  name: any;
  group: Array<TApplicant> | undefined;
  expanded: boolean;
  toggle: () => void;
}

function StatusApplications({
  name,
  group,
  expanded,
  toggle,
}: StatusApplicationsProps) {
  return (
    <>
      <HeaderBox
        title={`${name} (${group?.length ?? 0})`}
        isExpand={expanded}
        expandToggle={toggle}
        isExpandable={Boolean(group?.length)}
        isRound={true}
      />
      {expanded &&
        group?.map((item) => (
          <BodyCard
            key={item.id}
            username={item.user.username as string}
            applicationId={item.id}
            project={item.project}
            name={item.organization.meta.name}
            image={item.organization.meta.image}
          />
        ))}
    </>
  );
}

function MyApplicationBoxes() {
  const {state: showPending, handlers: showPendingHandler} = useToggle();
  const {state: showDecline, handlers: showDeclineHandler} = useToggle();
  const {state: showAwaiting, handlers: showAwaitingHandler} = useToggle();

  const {flattenData: data, infiniteError} =
    useInfiniteSWR<TApplicant>('/user/applicants');

  // TODO show error message
  // TODO load more (wait for filter by status)

  const groupByStatus = useMemo(() => {
    const map: Map<TApplicantStatus, Array<TApplicant>> = new Map();
    for (const item of data) {
      if (!map.has(item.status)) map.set(item.status, []);
      map.get(item.status)!.push(item);
    }
    return map;
  }, [data]);

  useEffect(() => {
    if (groupByStatus.get('PENDING')?.length) showPendingHandler.on();
    else if (groupByStatus.get('OFFERED')?.length) showAwaitingHandler.on();
    else if (groupByStatus.get('REJECTED')?.length) showDeclineHandler.on();
  }, [
    groupByStatus,
    showAwaitingHandler,
    showDeclineHandler,
    showPendingHandler,
  ]);

  return (
    <div className="w-full rounded-2xl border border-grayLineBased pb-4">
      <StatusApplications
        group={groupByStatus.get('PENDING')}
        name="Pending"
        expanded={showPending}
        toggle={showPendingHandler.toggle}
      />
      <StatusApplications
        group={groupByStatus.get('OFFERED')}
        name="Awaiting review"
        expanded={showAwaiting}
        toggle={showAwaitingHandler.toggle}
      />
      <StatusApplications
        group={groupByStatus.get('REJECTED')}
        name="Declined"
        expanded={showDecline}
        toggle={showDeclineHandler.toggle}
      />
    </div>
  );
}

export default MyApplicationBoxes;
