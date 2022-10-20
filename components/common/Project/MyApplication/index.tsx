import {useEffect} from 'react';
import useSWR from 'swr';
import BodyCard from '../component/BodyCard';
import HeaderBox from '../component/HeaderBox';
import {useToggle} from '@hooks';
import {IUserProjects} from '@models/project';
import {get} from 'utils/request';

// todo : type for groupByStatus
let groupByStatus: any;

function MyApplicationBoxes() {
  const {state: showPending, handlers: showPendingHandler} = useToggle();
  const {state: showDecline, handlers: showDeclineHandler} = useToggle();
  const {state: showAwaiting, handlers: showAwaitingHandler} = useToggle();

  const {data, error} = useSWR<any>('/user/applicants', get);

  const fetchUserProjects = () => {
    const {items} = data;
    groupByStatus = items.reduce((group: any, item: IUserProjects) => {
      const {status} = item;
      group[status] = group[status] ?? [];
      group[status].push(item);
      return group;
    }, {});
  };

  useEffect(() => {
    groupByStatus?.PENDING?.length && showPendingHandler.on();
  }, [data, showPendingHandler]);

  if (data) {
    fetchUserProjects();
  }

  if (!data && !error) return <p>loading</p>;

  return (
    <div className="w-full rounded-2xl border border-grayLineBased pb-4">
      <HeaderBox
        title={`Pending (${groupByStatus?.PENDING?.length ?? 0})`}
        isExpand={showPending}
        expandToggle={showPendingHandler.toggle}
        isExpandable={true}
        isRound={true}
      />
      {showPending &&
        groupByStatus?.PENDING?.map((item: IUserProjects) => (
          <BodyCard key={item.id} item={item} />
        ))}
      <HeaderBox
        title={`Awaiting review (${groupByStatus?.AWAITING?.length ?? 0})`}
        isExpand={showAwaiting}
        expandToggle={showAwaitingHandler.toggle}
        isExpandable={true}
        isRound={true}
      />
      {showAwaiting &&
        groupByStatus?.AWAITING?.map((item: IUserProjects) => (
          <BodyCard
            key={item.id}
            item={item}
            // refixAddress={`/app/projects/applications/section/${item.projectId}`}
          />
        ))}
      <HeaderBox
        title={`Declined (${groupByStatus?.DECLINE?.length ?? 0})`}
        isExpand={showDecline}
        expandToggle={showDeclineHandler.toggle}
        isExpandable={true}
        isRound={true}
      />
      {showDecline &&
        groupByStatus?.DECLINE?.map((item: IUserProjects) => (
          <BodyCard key={item.id} item={item} />
        ))}
    </div>
  );
}

export default MyApplicationBoxes;
