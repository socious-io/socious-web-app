import {useEffect, useState} from 'react';
import BodyCard from '../component/BodyCard';
import HeaderBox from '../component/HeaderBox';
import {useToggle} from '@hooks';
import {getUserProjects} from '@api/user/actions';
import {IUserProjects} from '@models/project';

function MyApplicationBoxes() {
  const {state: showPending, handlers: showPendingHandler} = useToggle();
  const {state: showDecline, handlers: showDeclineHandler} = useToggle();
  const {state: showAwaiting, handlers: showAwaitingHandler} = useToggle();

  const [userProjects, setUserProjects] = useState({
    PENDING: [],
    AWAITING: [],
    DECLINE: [],
  });

  const fetchUserProjects = async () => {
    try {
      const response: any = await getUserProjects();
      const {items} = response;
      const groupByStatus = items.reduce((group: any, item: IUserProjects) => {
        const {status} = item;
        group[status] = group[status] ?? [];
        group[status].push(item);
        return group;
      }, {});
      setUserProjects(groupByStatus);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProjects();
  }, []);

  return (
    <div className="w-full rounded-2xl border border-grayLineBased pb-4 ">
      <HeaderBox
        title={`pending (${userProjects?.PENDING?.length ?? 0})`}
        isExpand={showPending}
        expandToggle={showPendingHandler.toggle}
        isExpandable={true}
        isRound={true}
      />
      {showPending &&
        userProjects?.PENDING.map((item: IUserProjects) => (
          <BodyCard
            key={item.id}
            name={item.cover_letter}
            item={item}
            // refixAddress={`/app/projects/applications/section/${item.projectId}`}
          />
        ))}
      <HeaderBox
        title={`Awaiting review (${userProjects?.AWAITING?.length ?? 0})`}
        isExpand={showAwaiting}
        expandToggle={showAwaitingHandler.toggle}
        isExpandable={true}
        isRound={true}
      />
      {showAwaiting &&
        userProjects?.AWAITING?.map((item: IUserProjects) => (
          <BodyCard
            key={item.id}
            name={item.cover_letter}
            item={item}
            // refixAddress={`/app/projects/applications/section/${item.projectId}`}
          />
        ))}
      <HeaderBox
        title={`Declined (${userProjects?.DECLINE?.length ?? 0})`}
        isExpand={showDecline}
        expandToggle={showDeclineHandler.toggle}
        isExpandable={true}
        isRound={true}
      />
      {showDecline &&
        userProjects?.DECLINE?.map((item: IUserProjects) => (
          <BodyCard key={item.id} name={item.cover_letter} item={item} />
        ))}
    </div>
  );
}

export default MyApplicationBoxes;
