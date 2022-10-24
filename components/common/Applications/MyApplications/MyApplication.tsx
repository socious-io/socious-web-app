import Avatar from '@components/common/Avatar/Avatar';
import Button from '@components/common/Button/Button';
import {TApplicant} from '@models/applicant';
import {Project} from '@models/project';
import React, {Children, FC, PropsWithChildren} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';
import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import {useToggle, useUser} from '@hooks';
import {useFormattedLocation} from 'services/formatLocation';

const WrapperWithHead: FC<PropsWithChildren<{title: string}>> = ({
  title,
  children,
}) => {
  return (
    <div className="sm:border-grayLinedBased w-full divide-y divide-grayLineBased border bg-white sm:rounded-2xl">
      <h1 className="py-5 px-4 text-base font-semibold">{title}</h1>
      {children}
    </div>
  );
};

const MyApplication = ({applicant}: {applicant: TApplicant}) => {
  const {offer_message, payment_type, payment_rate, status} = applicant;
  const {state: seeFullCoverLetter, handlers: coverLetterHandlers} =
    useToggle();

  // Fetch Project
  const {data: project, error: projectError} = useSWR<Project>(
    applicant.project_id ? `/projects/${applicant.project_id}` : null,
    get,
  );

  const {user} = useUser();
  const location = useFormattedLocation(user);

  return (
    <div className="w-full space-y-4 rounded-2xl pb-4">
      {/* {status !== 'PENDING' && status !== 'REJECTED' && ( */}
      <WrapperWithHead title="Offer">
        <div className="p-4">
          {offer_message && <div>{offer_message}</div>}
          <div className="grid grid-cols-2 items-center p-2">
            <div className="flex flex-col">
              <p className="font-normal text-primary">Payment type</p>
              <p className="text-graySubtitle">
                {payment_type ?? 'Not specified'}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-normal text-primary ">Payment rate</p>
              <p className="text-graySubtitle">
                {payment_rate ?? 'Not specified'}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center space-x-2 p-4">
          <Button
            className="flex justify-center"
            type="submit"
            size="lg"
            value="Submit"
          >
            Accept Offer
          </Button>
          <Button
            className="flex justify-center"
            type="submit"
            size="lg"
            variant="outline"
            value="Submit"
          >
            Withdraw
          </Button>
        </div>
      </WrapperWithHead>
      {/* )} */}
      {project && (
        <WrapperWithHead title="Project Info">
          <div className="space-y-3 p-4">
            <h1 className="text-base font-semibold">{project.title}</h1>
            <div className="flex items-center space-x-2">
              <Avatar
                size="l"
                src={project.identity_meta.image}
                type="organizations"
              />
              <p className="text-black">{project.identity_meta.name}</p>
            </div>
            <BodyBox
              description={project.description}
              className="p-0"
              minCount={100}
            />
          </div>
        </WrapperWithHead>
      )}
      {/* TODO: Refactor with ApplicationInfo component once merged */}
      <WrapperWithHead title="My application">
        <div className=" divide-y bg-white ">
          <div className=" divide-y p-4 ">
            <p className="py-4 font-semibold text-black">Cover Letter</p>
            <div>
              <p className="py-4 font-normal text-gray-900">
                {applicant.cover_letter ? (
                  applicant?.cover_letter?.length > 200 &&
                  !seeFullCoverLetter ? (
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
              <p className="py-4 font-semibold text-black">
                Screening questions
              </p>
            </div>
            <div>
              {[1, 2, 3].map((item) => (
                <div key={item} className="my-4 flex flex-col">
                  <p className="text-black">Question1</p>
                  <p className="text-graySubtitle">Question</p>
                </div>
              ))}
              <p className="py-4 font-semibold text-black">Contact Info</p>
            </div>

            <div>
              <p className=" flex py-4 font-medium text-gray-900">
                {true ? (
                  // {applicant?.share_contact_info ? (
                  <>
                    <ul>
                      <li>{applicant.user.email}</li>
                      {user.phone_number && <li>{user.phone_number}</li>}
                      {location && <li>{location}</li>}
                      {user.address && (
                        <li>
                          {user.address ?? user.city + ', ' + user.country}
                        </li>
                      )}
                    </ul>
                  </>
                ) : (
                  'Contact information is private.'
                )}
              </p>
            </div>
          </div>
        </div>
      </WrapperWithHead>
    </div>
  );
};

export default MyApplication;
