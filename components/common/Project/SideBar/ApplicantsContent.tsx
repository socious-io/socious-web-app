import CardBoxComplete from '@components/common/CardBoxComplete/CardBoxComplete';
import {useToggle} from '@hooks';
import {TApplicantsByStatus, TApplicantsResponse} from '@models/applicant';
import dayjs from 'dayjs';
import Link from 'next/link';

import HeaderBox from '../component/HeaderBox';

type ApplicantsContentProps = {
  // projectId: string;
  flattenApplicantsObj: TApplicantsByStatus;
};

function ApplicantsContent({flattenApplicantsObj}: ApplicantsContentProps) {
  const {state: showOnGoing, handlers: showOnGoingHandler} = useToggle();
  const {state: showSaved, handlers: showSavedHandler} = useToggle();
  const {state: showDeclined, handlers: showDeclinedHandler} = useToggle();

  return (
    <div className="py-4">
      <div className="my-4 rounded-2xl border border-grayLineBased bg-white ">
        <HeaderBox
          title={`to review (${flattenApplicantsObj?.['PENDING']?.length})`}
          isExpand={showOnGoing}
          expandToggle={showOnGoingHandler.toggle}
          isExpandable={true}
          isRound={true}
        />
        {showOnGoing &&
          flattenApplicantsObj?.['PENDING'].map((applicant) => (
            <Link
              key={applicant.id}
              href={`/app/projects/created/${applicant.project_id}/applicants/${applicant.id}`}
            >
              <a>
                <CardBoxComplete
                  name={applicant?.user?.name}
                  username={applicant?.user?.username ?? ''}
                  applicationDate={dayjs(applicant?.created_at)?.format(
                    'MMM D',
                  )}
                  message={
                    applicant.offer_message
                      ? applicant.offer_message.length > 50
                        ? `${applicant.offer_message?.slice(0, 50)}...}`
                        : applicant.offer_message
                      : 'No message'
                  }
                />
              </a>
            </Link>
          ))}

        <HeaderBox
          isRound={false}
          title={`saved (${flattenApplicantsObj?.['OFFERED']?.length})`}
          isExpand={showSaved}
          expandToggle={showSavedHandler.toggle}
          isExpandable={true}
        />
        {showSaved &&
          flattenApplicantsObj?.['OFFERED'].map((applicant) => (
            <Link
              key={applicant.id}
              href={`/app/projects/created/${applicant.project_id}/applicants/${applicant.id}`}
            >
              <a>
                <CardBoxComplete
                  name={applicant?.user?.name}
                  username={applicant?.user?.username ?? ''}
                  applicationDate={dayjs(applicant?.created_at)?.format(
                    'MMM D',
                  )}
                  message={
                    applicant.offer_message
                      ? applicant.offer_message.length > 50
                        ? `${applicant.offer_message?.slice(0, 50)}...}`
                        : applicant.offer_message
                      : 'No message'
                  }
                />
              </a>
            </Link>
          ))}
        <HeaderBox
          isRound={false}
          title={`Declined (${flattenApplicantsObj?.['REJECTED']?.length})`}
          isExpand={showDeclined}
          expandToggle={showDeclinedHandler.toggle}
          isExpandable={true}
        />
        {showDeclined &&
          flattenApplicantsObj?.['REJECTED'].map((applicant) => (
            <Link
              key={applicant.id}
              href={`/app/projects/created/${applicant.project_id}/applicants/${applicant.id}`}
            >
              <a>
                <CardBoxComplete
                  name={applicant?.user?.name}
                  username={applicant?.user?.username ?? ''}
                  applicationDate={dayjs(applicant?.created_at)?.format(
                    'MMM D',
                  )}
                  message={
                    applicant.offer_message
                      ? applicant.offer_message.length > 50
                        ? `${applicant.offer_message?.slice(0, 50)}...}`
                        : applicant.offer_message
                      : 'No message'
                  }
                />
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default ApplicantsContent;
