import BodyCard from '../component/BodyCard';
import HeaderBox from '../component/HeaderBox';
import {useToggle} from '@hooks';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';
import {TApplicant, TApplicantStatus} from '@models/applicant';
import {useEffect, useMemo} from 'react';
import Button from '@components/common/Button/Button';

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
        isRound={position === 'FIRST'}
        className={`border-0 ${position === 'LAST' ? 'rounded-b-2xl' : ''}`}
      />
      {expandState && (
        <div>
          {flattenData?.map((item) => (
            <BodyCard
              key={item.id}
              applicationId={item.id}
              project={item.project}
              name={item.organization.meta.name}
              image={item.organization.meta.image}
            />
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
    <div className="divide-graylineBased mb-4 h-fit w-full divide-y rounded-2xl border border-grayLineBased">
      <StatusApplications name="Pending" status="PENDING" position="FIRST" />
      <StatusApplications name="Awaiting review" status="OFFERED" />
      <StatusApplications name="Declined" status="REJECTED" position="LAST" />
    </div>
  );
}

export default MyApplicationBoxes;
