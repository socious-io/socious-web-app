import React, {FC} from 'react';
import Title from '@components/molecules/Title';
import {Button} from '@components/common';
import {
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {initContext, useProjectContext} from '../context';
import {TOnSubmit} from '../sharedType';
import {FormLayout} from '../Layout';
import {AddQuestionTypeWithId, Question} from '@models/question';
import Image from 'next/future/image';
import editIcon from 'asset/icons/edit.svg';
import {useToggle} from '@hooks';

interface ProjectQuestionProps extends TOnSubmit {
  stepToEdit?: number;
  deleteQuestion: (id: string) => void;
}

const QuestionBox: FC<{
  question: Question | AddQuestionTypeWithId;
  title: string;
  editStep?: number;
  deleteQuestion: (id: string) => void;
}> = ({question, title, editStep = 4, deleteQuestion}) => {
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
            <TrashIcon
              onClick={() => deleteQuestion(question.id)}
              className="w-5 text-primary"
            />
          </div>
        </>
      )}
    </div>
  );
};

const ProjectQuestion: FC<ProjectQuestionProps> = ({
  onSubmit,
  stepToEdit,
  deleteQuestion,
}) => {
  const {ProjectContext, setProjectContext} = useProjectContext();

  return (
    <form className="flex h-full w-full flex-col">
      <FormLayout type="FULL" className="!grow">
        <div className="flex h-full w-full flex-col overflow-y-scroll bg-zinc-200">
          <div className="scroll-y-auto grow bg-offWhite">
            <div className="space-y-4 divide-y py-4">
              {ProjectContext.questions?.map((question, index) => (
                <QuestionBox
                  key={question.id}
                  title={`Question ${index + 1}`}
                  question={question}
                  editStep={4}
                  deleteQuestion={deleteQuestion}
                />
              ))}
            </div>
            <div className="flex items-center justify-center">
              <Button
                onClick={() =>
                  setProjectContext({
                    ...ProjectContext,
                    editQuestion: null,
                    formStep: 4,
                  })
                }
                disabled={
                  !!ProjectContext.questions &&
                  ProjectContext.questions.length >= 5
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
          {
            <Button
              type="submit"
              className="ml-2 flex h-11 w-36 items-center justify-center"
              onClick={() => setProjectContext(initContext)}
            >
              Done
            </Button>
          }
        </div>
      </FormLayout>
    </form>
  );
};

export default ProjectQuestion;
