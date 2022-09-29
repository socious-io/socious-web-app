import React, {FC, useEffect, useMemo} from 'react';
import {useFormContext} from 'react-hook-form';
import Title from '@components/common/CreateOrganization/components/Title';
import InputFiled from '@components/common/InputFiled/InputFiled';
import TextArea from '@components/common/TextArea/TextArea';

const ProjectInfo = () => {
  const formMethods = useFormContext();
  const {
    register,
    setValue,
    formState: {errors},
  } = formMethods;

  return (
    <div className="flex h-full w-full flex-col">
      <Title description="Describe your project in detail." border>
        Tell us more about your project.
      </Title>
      <div className="mx-4 ">
        <InputFiled
          label="Title"
          type="text"
          placeholder="Title"
          // onChange={(e) =>
          //   setValue('title', e.target.value, {
          //     shouldDirty: true,
          //     shouldValidate: true,
          //   })
          // }
          register={register('title')}
          errorMessage={errors?.['title']?.message}
          className="my-3"
          required
        />
        <TextArea
          label="Description"
          placeholder="Description"
          register={register('description')}
          errorMessage={errors?.['description']?.message}
          className="my-3"
          required
          rows={4}
        />
        <InputFiled
          label="Remote Preference"
          type="text"
          placeholder="Remote Preference"
          register={register('remote_preference')}
          errorMessage={errors?.['remote_preference']?.message}
          className="my-3"
          required
        />
        <InputFiled
          label="Payment Currency"
          type="text"
          placeholder="Payment Currency"
          register={register('payment_currency')}
          errorMessage={errors?.['payment_currency']?.message}
          className="my-3"
        />
        <InputFiled
          label="Payment Range Lower"
          type="text"
          placeholder="Payment Range Lower"
          register={register('payment_range_lower')}
          errorMessage={errors?.['payment_range_lower']?.message}
          className="my-3"
        />
        <InputFiled
          label="Payment Range Higher"
          type="text"
          placeholder="Payment Range Higher"
          register={register('payment_range_higher')}
          errorMessage={errors?.['payment_range_higher']?.message}
          className="my-3"
        />
        <InputFiled
          label="Experience Level"
          type="number"
          placeholder="Experience Level"
          register={{...register('experience_level')}}
          errorMessage={errors?.['experience_level']?.message}
          className="my-3"
        />
        <InputFiled
          label="Country"
          type="text"
          placeholder="Country"
          register={register('country')}
          errorMessage={errors?.['country']?.message}
          className="my-3"
        />
      </div>
    </div>
  );
};

export default ProjectInfo;
