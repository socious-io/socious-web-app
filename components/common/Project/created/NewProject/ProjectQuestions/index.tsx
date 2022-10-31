import React, {FC} from 'react';
import Title from '@components/common/CreateOrganization/components/Title';
import {Button} from '@components/common';
import {
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {initContext, useProjectContext} from '../context';
import {TOnSubmit} from '../sharedType';
import {FromLayout} from '../Layout';
import {Question} from '@models/question';
import Image from 'next/future/image';
import editIcon from 'asset/icons/edit.svg';
import {useToggle} from '@hooks';

const QuestionBox: FC<{question: Question; title: string}> = ({
  question,
  title,
}) => {
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
            <ChevronDownIcon className="w-5" />
          ) : (
            <ChevronUpIcon className="w-5" />
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
                  formStep: 4,
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

const ProjectQuestion: FC<TOnSubmit> = ({onSubmit}) => {
  const {ProjectContext, setProjectContext} = useProjectContext();

  return (
    <form className="flex h-full w-full flex-col">
      <FromLayout>
        <div className="flex h-full w-full flex-col bg-zinc-200">
          <Title
            description="Add up to 5 screener questions."
            border
            className="bg-white"
          >
            Screener questions
          </Title>
          <div className="scroll-y-auto grow bg-offWhite">
            <div className="space-y-4 divide-y py-4">
              {ProjectContext.questions?.map((question, index) => (
                <QuestionBox
                  key={question.id}
                  title={`Question ${index + 1}`}
                  question={question}
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
                className="my-4 flex w-11/12 items-center justify-start bg-white font-semibold"
                leftIcon={() => (
                  <PlusCircleIcon width={20} height={20} color="#000000" />
                )}
              >
                <div>Add Question</div>
              </Button>
            </div>
          </div>
        </div>
      </FromLayout>
      <div className=" flex items-end justify-end  p-4">
        <Button
          type="submit"
          className="flex h-11 w-36 items-center justify-center"
        >
          Continue
        </Button>
        <Button
          type="submit"
          variant="outline"
          className="ml-2 flex h-11 w-36 items-center justify-center"
          onClick={() => setProjectContext(initContext)}
        >
          skip
        </Button>
      </div>
    </form>
  );
};

export default ProjectQuestion;
