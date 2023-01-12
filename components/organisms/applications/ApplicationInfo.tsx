import {useToggle} from '@hooks';
import {TApplicant, TAnswer} from '@models/applicant';
import {TQuestionsResponse, Question} from '@models/question';
import React from 'react';
import {useFormattedLocation} from 'services/formatLocation';
import useSWR from 'swr';
import {twMerge} from 'tailwind-merge';
import {useRouter} from 'next/router';
import {get} from 'utils/request';
import Button from '@components/common/Button/Button';
import Image from 'next/image';
import cvIcon from 'asset/icons/feeds.svg';

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

  const {data: questions} = useSWR<TQuestionsResponse>(
    applicant.project_id ? `/projects/${applicant.project_id}/questions` : null,
    get,
  );

  const openInNewTab = (url: string | null) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={twMerge(
        ' divide-y rounded-2xl border border-grayLineBased bg-white ',
        className && className,
      )}
    >
      <div className="p-4">
        <p className="border-b py-4 font-semibold text-black">Cover Letter</p>
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
        </div>
        {(applicant.attachment?.id || applicant.cv_link) && (
          <div>
            <p className="border-b py-4 font-semibold text-black">Resume</p>
            <Button
              variant="link"
              className="font-semibold text-primary"
              onClick={() =>
                openInNewTab(applicant.attachment?.url || applicant.cv_link)
              }
            >
              <div className="relative h-5 w-5 ">
                <a>
                  <Image
                    src={cvIcon}
                    className="fill-warning"
                    alt="cv icon"
                    layout="fill" // required
                  />
                </a>
              </div>
              {applicant.attachment?.filename || 'resume'}
            </Button>
          </div>
        )}

        {applicant.answers && !!questions?.questions?.length && (
          <ApplicationAnswers
            answers={applicant.answers}
            questions={questions?.questions?.sort(
              (x, y) => Date.parse(x.created_at) - Date.parse(y.created_at),
            )}
          />
        )}
        <div>
          <p className="border-b py-4 font-semibold text-black">Contact Info</p>
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

export const ApplicationAnswers = ({
  answers,
  questions,
}: {
  answers: TAnswer[];
  questions: Question[];
}) => {
  return (
    <div>
      <p className="border-b py-4 font-semibold text-black">
        Screening questions
      </p>
      {questions.map((question) => {
        const answer = answers.find(
          (answer) => question.id === answer.question_id,
        );
        return (
          <div key={question.id} className="my-4 flex flex-col">
            <p className="text-black">{question?.question}</p>
            <p className="text-graySubtitle">
              {answer
                ? answer.selected_option
                  ? question?.options[answer.selected_option - 1]
                  : answer.answer
                : 'Not answered.'}
            </p>
          </div>
        );
      })}
    </div>
  );
};
