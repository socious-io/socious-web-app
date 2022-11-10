import React, {FC} from 'react';
import Title from '@components/common/CreateOrganization/components/Title';
import {Button} from '@components/common';
import {
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import {initContext, useProjectContext} from '../context';
import {TOnSubmit} from '../sharedType';
import {FromLayout} from '../Layout';
import {AddQuestionTypeWithId, Question} from '@models/question';
import Image from 'next/future/image';
import editIcon from 'asset/icons/edit.svg';
import {useToggle} from '@hooks';

interface ProjectQuestionProps extends TOnSubmit {
  type?: 'EDIT' | 'NEW';
  stepToEdit?: number;
}

const QuestionBox: FC<{
  question: Question | AddQuestionTypeWithId;
  title: string;
  editStep?: number;
}> = ({question, title, editStep = 4}) => {
  const {state: show, handlers: showHandlers} = useToggle();
  const {ProjectContext, setProjectContext} = useProjectContext();

  return (
    <div className="px-4">
      <div
        className="my-4 flex items-center justify-between space-y-4 text-base font-semibold"
        onClick={showHandlers.toggle}
      >
        <span>{title}</span>
        <span>
          {show ? (
            <ChevronUpIcon className="w-5" />
          ) : (
            <ChevronDownIcon className="w-5" />
          )}
        </span>
      </div>
      {show && (
        <>
          <p className="p-4">{question.question}</p>
          <div className="flex items-center justify-end space-x-4">
            <div
              className="m-2 h-5 w-5 cursor-pointer"
              onClick={() =>
                setProjectContext({
                  ...ProjectContext,
                  editQuestion: question,
                  formStep: editStep,
                })
              }
            >
              <Image
                src={editIcon}
                alt={`edit icon`}
                width={100}
                height={100}
              />
            </div>
            {/* <TrashIcon className="w-5" /> */}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectQuestion: FC<ProjectQuestionProps> = ({
  onSubmit,
  type = 'NEW',
  stepToEdit,
}) => {
  const {ProjectContext, setProjectContext} = useProjectContext();

  return (
    <form className="flex h-full w-full flex-col">
      <FromLayout type="FULL" className="!grow">
        <div className="flex h-full w-full flex-col overflow-y-scroll bg-zinc-200">
          <Title
            description="Add up to 5 screener questions."
            border
            className="bg-white"
          >
            Screener questions
          </Title>
          <div className="scroll-y-auto grow bg-offWhite">
            <div className="space-y-4 divide-y py-4">
              {type === 'EDIT'
                ? ProjectContext.questions?.map((question, index) => (
                    <QuestionBox
                      key={question.id}
                      title={`Question ${index + 1}`}
                      question={question}
                      editStep={4}
                    />
                  ))
                : ProjectContext.newQuestions?.map((question, index) => (
                    <QuestionBox
                      key={question.id}
                      title={`Question ${index + 1}`}
                      question={question}
                      editStep={stepToEdit}
                    />
                  ))}
            </div>
            <div className="flex items-center justify-center">
              <Button
                onClick={() =>
                  setProjectContext({
                    ...ProjectContext,
                    editQuestion: null,
                    formStep: type === 'NEW' ? 6 : 4,
                  })
                }
                disabled={
                  type === 'NEW'
                    ? !!ProjectContext.questions &&
                      ProjectContext.questions.length >= 5
                    : !!ProjectContext.newQuestions &&
                      ProjectContext.newQuestions.length >= 5
                }
                variant="outline"
                size="lg"
                className="my-4 flex w-11/12 items-center justify-center bg-white font-semibold"
                leftIcon={() => (
                  <PlusCircleIcon width={20} height={20} color="#000000" />
                )}
              >
                <div>Add Question</div>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-end border-t p-4">
          {type === 'NEW' ? (
            <>
              <Button
                type="submit"
                className="flex h-11 w-36 items-center justify-center"
                onClick={() =>
                  setProjectContext({
                    ...ProjectContext,
                    formStep: 4,
                  })
                }
              >
                Continue
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="ml-2 flex h-11 w-36 items-center justify-center"
                onClick={() =>
                  setProjectContext({
                    ...ProjectContext,
                    questions: null,
                    formStep: 4,
                  })
                }
              >
                skip
              </Button>
            </>
          ) : (
            <Button
              type="submit"
              className="ml-2 flex h-11 w-36 items-center justify-center"
              onClick={() => setProjectContext(initContext)}
            >
              Done
            </Button>
          )}
        </div>
      </FromLayout>
    </form>
  );
};

export default ProjectQuestion;
