import React, {FC} from 'react';
import Title from '@components/common/CreateOrganization/components/Title';
import {Button} from '@components/common';
import {PlusCircleIcon} from '@heroicons/react/24/outline';
import {useProjectContext} from '../context';
import {TOnSubmit} from '../sharedType';
import {FromLayout} from '../Layout';

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
          <div className="flex items-center justify-center">
            <Button
              onClick={() =>
                setProjectContext({
                  ...ProjectContext,
                  formStep: 5,
                })
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
        >
          skip
        </Button>
      </div>
    </form>
  );
};

export default ProjectQuestion;
