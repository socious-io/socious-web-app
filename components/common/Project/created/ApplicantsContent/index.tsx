import Button from '@components/common/Button/Button';
import {useToggle, useUser} from '@hooks';
import {TApplicant} from '@models/applicant';
import useSWR from 'swr';
import {get} from 'utils/request';
import ApplicantHiredCard from '../../component/ApplicantHireCard';

var data = [
  {
    id: 1,
    projectId: '1',
  },
  {
    id: 2,
    projectId: '2',
  },
  {
    id: 3,
    projectId: '3',
  },
];
var data2 = [
  {
    id: 1,
    projectId: '1',
  },
  {
    id: 2,
    projectId: '2',
  },
  {
    id: 3,
    projectId: '3',
  },
];
var data3 = [
  {
    id: 1,
    projectId: '1',
  },
  {
    id: 2,
    projectId: '2',
  },
  {
    id: 3,
    projectId: '3',
  },
];

// Type
type MyApplicationBoxesProps = {
  applicant: TApplicant;
};
function MyApplicationBoxes({applicant}: MyApplicationBoxesProps) {
  // console.log('APPLICANTS INFO :---: ', applicantInfo);
  const {data: applicantInfo, error: applicantInfoError} = useSWR<any>(
    applicant?.user?.username
      ? `/user/by-username/${applicant.user.username}/profile`
      : null,
    get,
  );
  return (
    <div className="w-full pb-4 ">
      <div className="w-full pb-4 ">
        <ApplicantHiredCard
          name={applicant?.user?.name}
          userId={applicant?.user_id}
          applicantId={applicant?.id}
          bio={applicantInfo?.bio ?? 'No Bio'}
          avatar={applicant?.user?.avatar}
          username={applicant?.user?.username}
          status={applicant?.status}
        />
        <div className=" divide-y rounded-2xl border border-grayLineBased bg-white ">
          <div className=" divide-y p-4 ">
            <p className="py-4 font-semibold text-black">Cover Letter</p>
            <div>
              <p className=" flex py-4 font-medium text-gray-900">
                {applicant.cover_letter
                  ? applicant?.cover_letter?.length > 200
                    ? `${applicant?.cover_letter?.slice(0, 200)}...` +
                      'See more'
                    : applicant?.cover_letter
                  : 'No cover letter provided'}
              </p>
              <p className="py-4 font-semibold text-black">
                Screening questions
              </p>
            </div>
            <div>
              {data.map((e) => (
                <div key={e.id} className="my-4 flex flex-col">
                  <p className="text-black">Question1</p>
                  <p className="text-graySubtitle">Question</p>
                </div>
              ))}
              <p className="py-4 font-semibold text-black">Contact Info</p>
            </div>

            <div>
              <p className=" flex py-4 font-medium text-gray-900">
                Your contact information (email, phone & address) will be shared
                with Organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyApplicationBoxes;
