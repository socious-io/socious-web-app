import React from 'react';
import {StepProps} from '@models/stepProps';
import {useForm} from 'react-hook-form';
import TextArea from '@components/common/TextArea/TextArea';
import Button from '@components/common/Button/Button';
import useUser from 'hooks/useUser/useUser';
import Avatar from '@components/common/Avatar/Avatar';
import BodyBox from '../../BodyBox/BodyBox';
import {FromLayout} from '../../created/NewProject/Layout';
import {schemaApplyProject} from '@api/projects/validation';
import {joiResolver} from '@hookform/resolvers/joi';
import {useProjectContext} from '../../created/NewProject/context';

const ApplyStep1 = ({onSubmit}: StepProps) => {
  const {user} = useUser();
  const {ProjectContext, setProjectContext} = useProjectContext();
  const {
    handleSubmit,
    formState: {isValid, errors},
    setValue,
  } = useForm({
    resolver: joiResolver(schemaApplyProject),
  });

  const handleChange = (field: string, input: string) => {
    setValue(field, input, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setProjectContext({
      ...ProjectContext,
      [field]: input,
    });
  };

  return (
    <form
      className="flex h-full w-full flex-col "
      onSubmit={handleSubmit(onSubmit)}
    >
      <FromLayout>
        <div className="mt-2 flex h-full flex-col space-y-4 px-4">
          <p className="font-bold text-black">project title</p>
          <div className="flex flex-row space-x-2">
            <Avatar size="s" type="organizations" />

            <p className="text-black">Organization</p>
          </div>
          <p className="text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Equat
            faucibus sed facilisi sit id blandiacilisi sit id blandit... See
            more
          </p>
          <div className="divid-y">
            <div>
              <hr />
            </div>
            <BodyBox title={'Cover Letter'} description={''} />
            <div>
              <hr />
            </div>
          </div>
          <p className="text-black">
            Message<span className="ml-1 font-bold text-red-500 ">*</span>
          </p>
          <TextArea
            placeholder="Write a message..."
            rows={5}
            containerClassName=""
            className="border-gray border-1  overflow-y-scroll focus:border-none"
            errorMessage={errors?.['content']?.message}
            onChange={(e) => handleChange('cover_letter', e.target.value)}
          />
        </div>
      </FromLayout>
      <div className=" flex items-end justify-end  border-t p-4 px-4">
        <Button
          disabled={!isValid}
          className="flex h-11 w-52 items-center justify-center"
          type="submit"
          variant="fill"
          value="Submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ApplyStep1;
