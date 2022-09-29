import React, {FC} from 'react';
import Title from '@components/common/CreateOrganization/components/Title';
import {useFormContext} from 'react-hook-form';
import {Button} from '@components/common';
import {PlusCircleIcon} from '@heroicons/react/24/outline';
import {TProjectInput} from '../sharedType';

const ProjectQuestion: FC<TProjectInput> = ({setFormStep}) => {
  return (
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
          onClick={setFormStep}
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
  );
};

export default ProjectQuestion;
