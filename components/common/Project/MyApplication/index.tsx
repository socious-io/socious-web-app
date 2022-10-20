import BodyCard from '../component/BodyCard';
import HeaderBox from '../component/HeaderBox';
import {useToggle} from '@hooks';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';
import {TApplicant, TApplicantStatus} from '@models/applicant';
import {useEffect, useMemo} from 'react';

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
      <HeaderBox
        title={`Pending (${groupByStatus.get('PENDING')?.length ?? 0})`}
        isExpand={showPending}
        expandToggle={showPendingHandler.toggle}
        isExpandable={true}
        isRound={true}
      />
      {showPending &&
        groupByStatus
          .get('PENDING')
          ?.map((item) => (
            <BodyCard
              key={item.id}
              project={item.project}
              name={item.organization.meta.name}
              image={item.organization.meta.image}
            />
          ))}
      <HeaderBox
        title={`Awaiting review (${groupByStatus.get('OFFERED')?.length ?? 0})`}
        isExpand={showAwaiting}
        expandToggle={showAwaitingHandler.toggle}
        isExpandable={true}
        isRound={true}
      />
      {showAwaiting &&
        groupByStatus
          .get('OFFERED')
          ?.map((item) => (
            <BodyCard
              key={item.id}
              project={item.project}
              name={item.organization.meta.name}
              image={item.organization.meta.image}
            />
          ))}
      <HeaderBox
        title={`Declined (${groupByStatus.get('REJECTED')?.length ?? 0})`}
        isExpand={showDecline}
        expandToggle={showDeclineHandler.toggle}
        isExpandable={true}
        isRound={true}
      />
      {showDecline &&
        groupByStatus
          .get('REJECTED')
          ?.map((item) => (
            <BodyCard
              key={item.id}
              project={item.project}
              name={item.organization.meta.name}
              image={item.organization.meta.image}
            />
          ))}
    </div>
  );
}

export default MyApplicationBoxes;
