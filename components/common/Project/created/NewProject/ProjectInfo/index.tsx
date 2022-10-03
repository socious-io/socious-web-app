import React, {FC} from 'react';
import {useForm} from 'react-hook-form';
import Title from '@components/common/CreateOrganization/components/Title';
import InputFiled from '@components/common/InputFiled/InputFiled';
import TextArea from '@components/common/TextArea/TextArea';
import {Combobox} from '@components/common';
import useGetData from './useGetData';
import {joiResolver} from '@hookform/resolvers/joi';
import {schemaCreateProjectStep2} from '@api/projects/validation';
import {useProjectContext} from '../context';
import {FromLayout} from '../Layout';
import {TOnSubmit} from '../sharedType';
import {Button} from '@components/common';

const ProjectInfo: FC<TOnSubmit> = ({onSubmit}) => {
  const {
    setValue,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({resolver: joiResolver(schemaCreateProjectStep2)});
  const {setProjectContext, ProjectContext} = useProjectContext();
  const {items} = useGetData();

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
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col"
    >
      <FromLayout>
        <div className="overflow-y-scroll">
          <Title description="Describe your project in detail." border>
            Tell us more about your project.
          </Title>
          <div className="mx-4 ">
            <InputFiled
              label="Title"
              type="text"
              value={ProjectContext.title}
              placeholder="Title"
              onChange={(e) => handleChange('title', e.target.value)}
              errorMessage={errors?.['title']?.message}
              className="my-3"
              required
            />
            <TextArea
              label="Description"
              placeholder="Description"
              value={ProjectContext.description}
              onChange={(e) => handleChange('description', e.target.value)}
              errorMessage={errors?.['description']?.message}
              className="my-3"
              required
              rows={4}
            />
            <Combobox
              label="Remote Preference"
              // required
              name="remote_preference"
              onSelected={(e) => handleChange('remote_preference', e?.id)}
              items={items.projectRemotePreferenceItems}
              placeholder="Remote Preference"
              className="mt-6"
            />
            <Combobox
              label="Payment Type"
              name="payment_type"
              items={items.projectPaymentTypeItems}
              placeholder="Payment Type"
              className="mt-6"
              onSelected={(e) => handleChange('payment_type', e?.id)}
            />
            <Combobox
              label="Payment Scheme"
              name="payment_scheme"
              items={items.projectPaymentSchemeItems}
              placeholder="Payment Scheme"
              className="mt-6"
              onSelected={(e) => handleChange('payment_scheme', e?.id)}
            />
            <Combobox
              label="Status"
              name="status"
              items={items.projectStatusItems}
              placeholder="Status"
              className="mt-6"
              onSelected={(e) => handleChange('status', e?.id)}
            />
            <Combobox
              label="Project Type"
              name="project_type"
              items={items.projectItems}
              placeholder="Project Type"
              className="mt-6"
              onSelected={(e) => handleChange('project_type', e?.id)}
            />
            <Combobox
              label="Project Length"
              name="project_length"
              items={items.projectLengthItems}
              placeholder="Project Length"
              className="mt-6"
              onSelected={(e) => handleChange('project_length', e?.id)}
            />
            <InputFiled
              label="Payment Currency"
              type="text"
              placeholder="Payment Currency"
              value={ProjectContext.payment_currency}
              errorMessage={errors?.['payment_currency']?.message}
              className="my-3"
              onChange={(e) => handleChange('payment_currency', e.target.value)}
            />
            <InputFiled
              label="Payment Range Lower"
              type="text"
              placeholder="Payment Range Lower"
              value={ProjectContext.payment_range_lower}
              errorMessage={errors?.['payment_range_lower']?.message}
              className="my-3"
              onChange={(e) =>
                handleChange('payment_range_lower', e.target.value)
              }
            />
            <InputFiled
              label="Payment Range Higher"
              type="text"
              placeholder="Payment Range Higher"
              value={ProjectContext.payment_range_higher}
              errorMessage={errors?.['payment_range_higher']?.message}
              className="my-3"
              onChange={(e) =>
                handleChange('payment_range_higher', e.target.value)
              }
            />
            <InputFiled
              label="Experience Level"
              type="number"
              placeholder="Experience Level"
              value={ProjectContext.experience_level}
              errorMessage={errors?.['experience_level']?.message}
              className="my-3"
              onChange={(e) => handleChange('experience_level', e.target.value)}
            />
            <InputFiled
              label="Country"
              type="text"
              value={ProjectContext.country}
              placeholder="Country"
              errorMessage={errors?.['country']?.message}
              className="my-3"
              onChange={(e) => handleChange('country', e.target.value)}
            />
          </div>
        </div>
      </FromLayout>
      <div className=" flex items-end justify-end  border-t p-4">
        <Button
          disabled={!isValid}
          type="submit"
          className="flex h-11 w-52 items-center justify-center"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default ProjectInfo;
