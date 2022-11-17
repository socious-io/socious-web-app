import {useToggle} from '@hooks';
import {TApplicant, TAnswer} from '@models/applicant';
import {TQuestionsResponse, Question} from '@models/question';
import React from 'react';
import {useFormattedLocation} from 'services/formatLocation';
import useSWR from 'swr';
import {twMerge} from 'tailwind-merge';
import {get} from 'utils/request';

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
