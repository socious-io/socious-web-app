import React, {FC} from 'react';
import Title from '@components/molecules/Title';
import {Button} from '@components/common';
import {
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import {
  initContext,
  useProjectContext,
} from '@components/common/Project/created/NewProject/context';
import {TOnSubmit} from '@components/common/Project/created/NewProject/sharedType';
import {FormLayout} from '@components/common/Project/created/NewProject/Layout';
import {AddQuestionTypeWithId, Question} from '@models/question';
import Image from 'next/future/image';
import editIcon from 'asset/icons/edit.svg';
import {useToggle} from '@hooks';

interface ProjectQuestionProps extends TOnSubmit {
  type?: 'EDIT' | 'NEW';
  onEditDetail: () => void;
}

const QuestionBox: FC<{
  question: Question | AddQuestionTypeWithId;
  title: string;
  onEditDetail: () => void;
}> = ({question, title, onEditDetail}) => {
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
              onClick={() => {
                setProjectContext({
                  ...ProjectContext,
                  editQuestion: question,
                });
                onEditDetail();
              }}
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

const ProjectQuestions: FC<ProjectQuestionProps> = ({
  onSubmit,
  type = 'NEW',
  onEditDetail,
}) => {
  const {ProjectContext, setProjectContext} = useProjectContext();

  return (
    <form className="flex h-full w-full flex-col">
      <FormLayout type="FULL" className="!grow">
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
              {ProjectContext.newQuestions?.map((question, index) => (
                <QuestionBox
                  key={question.id}
                  title={`Question ${index + 1}`}
                  question={question}
                  onEditDetail={onEditDetail}
                />
              ))}
            </div>
            <div className="flex items-center justify-center">
              <Button
                onClick={() => {
                  setProjectContext({
                    ...ProjectContext,
                    editQuestion: null,
                  });
                  onEditDetail();
                }}
                disabled={
                  type === 'EDIT'
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
                onClick={() => onSubmit()}
              >
                Continue
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="ml-2 flex h-11 w-36 items-center justify-center"
                onClick={() => {
                  setProjectContext({
                    ...ProjectContext,
                    questions: null,
                  });
                  onSubmit();
                }}
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
      </FormLayout>
    </form>
  );
};

export default ProjectQuestions;
