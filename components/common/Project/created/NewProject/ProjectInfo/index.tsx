import React, {FC, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import Title from '@components/common/CreateOrganization/components/Title';
import InputFiled from '@components/common/InputFiled/InputFiled';
import TextArea from '@components/common/TextArea/TextArea';
import {Combobox} from '@components/common';
import useGetData from './useGetData';
import {joiResolver} from '@hookform/resolvers/joi';
import {schemaCreateProjectStep3} from '@api/projects/validation';
import {useProjectContext} from '../context';
import {FromLayout} from '../Layout';
import {TOnSubmit} from '../sharedType';
import {Button} from '@components/common';

const ProjectInfo: FC<TOnSubmit> = ({onSubmit}) => {
  const {setProjectContext, ProjectContext} = useProjectContext();
  const disableIcon =
    !ProjectContext.title ||
    !ProjectContext.description ||
    !ProjectContext.remote_preference;
  const {
    setValue,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: ProjectContext.isEditModalOpen
      ? undefined
      : joiResolver(schemaCreateProjectStep3),
  });
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
          <div className="mx-4 my-5">
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
              required
              name="remote_preference"
              onSelected={(e) => handleChange('remote_preference', e?.id)}
              items={items.projectRemotePreferenceItems}
              placeholder="Remote Preference"
              className="mt-6"
              selected={items.projectRemotePreferenceItems?.find(
                (x) => x?.id === ProjectContext.remote_preference,
              )}
            />
            <Combobox
              label="Payment Type"
              name="payment_type"
              items={items.projectPaymentTypeItems}
              placeholder="Payment Type"
              className="mt-6"
              onSelected={(e) => handleChange('payment_type', e?.id)}
              selected={items.projectPaymentTypeItems?.find(
                (x) => x?.id === ProjectContext.payment_type,
              )}
            />
            <Combobox
              label="Payment Scheme"
              name="payment_scheme"
              items={items.projectPaymentSchemeItems}
              placeholder="Payment Scheme"
              className="mt-6"
              onSelected={(e) => handleChange('payment_scheme', e?.id)}
              selected={items.projectPaymentSchemeItems?.find(
                (x) => x?.id === ProjectContext.payment_scheme,
              )}
            />
            <Combobox
              label="Status"
              name="status"
              items={items.projectStatusItems}
              placeholder="Status"
              className="mt-6"
              onSelected={(e) => handleChange('status', e?.id)}
              selected={items.projectStatusItems?.find(
                (x) => x?.id === ProjectContext.status,
              )}
            />
            <Combobox
              label="Project Type"
              name="project_type"
              items={items.projectItems}
              placeholder="Project Type"
              className="mt-6"
              onSelected={(e) => handleChange('project_type', e?.id)}
              selected={items.projectItems?.find(
                (x) => x?.id === ProjectContext.project_type,
              )}
            />
            <Combobox
              label="Project Length"
              name="project_length"
              items={items.projectLengthItems}
              placeholder="Project Length"
              className="mt-6"
              onSelected={(e) => handleChange('project_length', e?.id)}
              selected={items.projectLengthItems?.find(
                (x) => x?.id === ProjectContext.project_length,
              )}
            />
            <Combobox
              label="Payment Currency"
              name="payment_currency"
              items={items.allCurrencies}
              placeholder="Payment Currency"
              className="mt-6"
              onSelected={(e) => handleChange('payment_currency', e?.id)}
              selected={items.allCurrencies?.find(
                (x) => x?.id === ProjectContext.payment_currency,
              )}
            />

            <InputFiled
              min={0}
              label="Payment Range Lower"
              type="number"
              placeholder="Payment Range Lower"
              value={ProjectContext.payment_range_lower}
              errorMessage={errors?.['payment_range_lower']?.message}
              className="my-3"
              onChange={(e) => {
                if (e.target.value)
                  handleChange('payment_range_lower', e.target.value);
              }}
            />
            <InputFiled
              min={0}
              label="Payment Range Higher"
              type="number"
              placeholder="Payment Range Higher"
              value={ProjectContext.payment_range_higher}
              errorMessage={errors?.['payment_range_higher']?.message}
              className="my-3"
              onChange={(e) => {
                if (e.target.value)
                  handleChange('payment_range_higher', e.target.value);
              }}
            />
            <InputFiled
              min={0}
              label="Experience Level"
              type="number"
              placeholder="Experience Level"
              value={ProjectContext.experience_level}
              errorMessage={errors?.['experience_level']?.message}
              className="my-3"
              onChange={(e) => {
                if (e.target.value)
                  handleChange('experience_level', e.target.value);
              }}
            />
            <Combobox
              label="Country"
              name="country"
              items={items.countries}
              placeholder="Country"
              className="my-3"
              onSelected={(e) => handleChange('Country', e?.id)}
              selected={items.countries?.find(
                (x) => x?.id === ProjectContext.country,
              )}
            />
          </div>
        </div>
      </FromLayout>
      <div className=" flex items-end justify-end  border-t p-4">
        <Button
          disabled={ProjectContext.isEditModalOpen ? disableIcon : !isValid}
          type="submit"
          className="flex h-11 w-52 items-center justify-center"
        >
          {ProjectContext.isEditModalOpen ? 'Save Changes' : ' Continue'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectInfo;
