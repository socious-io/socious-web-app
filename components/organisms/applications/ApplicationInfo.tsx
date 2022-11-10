import {useToggle} from '@hooks';
import {TApplicant} from '@models/applicant';
import {TUserByUsername} from '@models/profile';
import React from 'react';
import {useFormattedLocation} from 'services/formatLocation';
import {twMerge} from 'tailwind-merge';

const ApplicationInfo = ({
  className,
  applicant,
}: {
  className?: string;
  applicant: TApplicant;
}) => {
  const {state: seeFullCoverLetter, handlers: coverLetterHandlers} =
    useToggle();

  const location = useFormattedLocation(
    applicant.share_contact_info ? applicant.user : {},
  );

  return (
    <div
      className={twMerge(
        ' divide-y rounded-2xl border border-grayLineBased bg-white ',
        className && className,
      )}
    >
      <div className=" divide-y p-4 ">
        <p className="py-4 font-semibold text-black">Cover Letter</p>
        <div>
          <p className="py-4 font-normal text-gray-900">
            {applicant.cover_letter ? (
              applicant?.cover_letter?.length > 200 && !seeFullCoverLetter ? (
                <>
                  {applicant?.cover_letter?.slice(0, 200)}...
                  <span
                    className="inline-block cursor-pointer text-primary"
                    onClick={() => coverLetterHandlers.on()}
                  >
                    See more
                  </span>
                </>
              ) : (
                applicant?.cover_letter
              )
            ) : (
              'No cover letter provided'
            )}
          </p>
          <p className="py-4 font-semibold text-black">Screening questions</p>
        </div>
        <div>
          {[1, 2, 3, 4].map((e) => (
            <div key={e} className="my-4 flex flex-col">
              <p className="text-black">Question1</p>
              <p className="text-graySubtitle">Question</p>
            </div>
          ))}
          <p className="py-4 font-semibold text-black">Contact Info</p>
        </div>

        <div>
          <p className=" flex py-4 font-medium text-gray-900">
            {applicant?.share_contact_info ? (
              <>
                <ul>
                  <li>{applicant.user.email}</li>
                  {location && <li>{location}</li>}
                </ul>
              </>
            ) : (
              'Contact information is private.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationInfo;
