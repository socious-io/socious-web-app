import React, {FC, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import Title from '@components/molecules/Title';
import InputFiled from '@components/common/InputFiled/InputFiled';
import TextArea from '@components/common/TextArea/TextArea';
import {Combobox} from '@components/common';
import {
  currencyOptions,
  experienceLevelOptions,
  projectItems,
  projectLengthItems,
  projectPaymentSchemeItems,
  projectPaymentTypeItems,
  projectRemotePreferenceItems,
} from 'utils/socious-data';
import {FormLayout} from '@components/common/Project/created/NewProject/Layout';
import {Button} from '@components/common';
import {LocationFormFragment} from '@components/organisms/data/location-form-fragment';

const ProjectInfo: FC<{onSubmit: () => void}> = ({onSubmit}) => {
  const {
    setValue,
    watch,
    register,
    getValues,
    formState: {errors, isValid, isDirty},
  } = useFormContext();

  const paymentType = watch('payment_type');
  const paymentScheme = watch('payment_scheme');
  const countryCode = watch('country');
  const city = watch('city');
  const geonameId = watch('geoname_id');
  const current = getValues();

  const handleChange = (field: any, input: string) => {
    setValue(field, input, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSetCity = (data: string) => {
    setValue('city', data, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSetGeoId = (data: number) => {
    setValue('geoname_id', data, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onCountrySelected = async (newCountryCode: string) => {
    setValue('country', newCountryCode, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (city && newCountryCode !== countryCode) handleSetCity('');
  };

  if (!isValid) console.log(errors);

  return (
    <form className="flex h-full w-full flex-col">
      <FormLayout>
        <div className="overflow-y-scroll">
          <Title description="Describe your project in detail." border>
            Tell us more about your project.
          </Title>
          <div className="space-y-5 divide-y">
            <div className="p-4">
              <h1 className="pt-4 text-xl font-semibold text-neutral-300">
                Project info
              </h1>
              <InputFiled
                label="Title"
                type="text"
                register={register('title')}
                errorMessage={errors.title?.message}
                placeholder="Title"
                className="my-3"
                required
              />
              <TextArea
                label="Description"
                placeholder="Description"
                register={register('description')}
                errorMessage={errors.description?.message}
                className="my-3"
                required
                rows={4}
              />
              <LocationFormFragment
                country={countryCode}
                city={city}
                geonameId={geonameId}
                setCountry={onCountrySelected}
                setCity={handleSetCity}
                setGeonameId={handleSetGeoId}
                errorCity={errors.city?.message}
                errorCountry={errors.country?.message}
                allowWorldwide={true}
                allowCityClear={true}
              />
              <Combobox
                label="Remote Preference"
                required
                name="remote_preference"
                onSelected={(e) => handleChange('remote_preference', e?.id)}
                items={projectRemotePreferenceItems}
                placeholder="Remote Preference"
                className="mt-6"
                selected={projectRemotePreferenceItems?.find(
                  (x) => x?.id === current.remote_preference,
                )}
              />
              <Combobox
                required
                label="Project Type"
                name="project_type"
                items={projectItems}
                placeholder="Project Type"
                className="mt-6"
                onSelected={(e) => handleChange('project_type', e?.id)}
                selected={projectItems?.find(
                  (x) => x?.id === current.project_type,
                )}
              />
              <Combobox
                required
                label="Project Length"
                name="project_length"
                items={projectLengthItems}
                placeholder="Project Length"
                className="mt-6"
                onSelected={(e) => handleChange('project_length', e?.id)}
                selected={projectLengthItems?.find(
                  (x) => x?.id === current.project_length,
                )}
              />
            </div>
            <div className="p-4">
              <h1 className="pt-4 text-xl font-semibold text-neutral-300">
                Payment
              </h1>
              <Combobox
                label="Payment Currency"
                name="payment_currency"
                items={currencyOptions}
                placeholder="Payment Currency"
                className="mt-6"
                onSelected={(e) => handleChange('payment_currency', e?.id)}
                selected={currencyOptions?.find(
                  (x) => x?.id === current.payment_currency,
                )}
              />
              <Combobox
                required
                label="Payment Type"
                name="payment_type"
                items={projectPaymentTypeItems}
                placeholder="Payment Type"
                className="mt-6"
                onSelected={(e) => handleChange('payment_type', e?.id)}
                selected={projectPaymentTypeItems?.find(
                  (x) => x?.id === current.payment_type,
                )}
              />
              <Combobox
                required
                label="Payment Scheme"
                name="payment_scheme"
                items={projectPaymentSchemeItems}
                placeholder="Payment Scheme"
                className="mt-6"
                onSelected={(e) => handleChange('payment_scheme', e?.id)}
                selected={projectPaymentSchemeItems?.find(
                  (x) => x?.id === current.payment_scheme,
                )}
              />
              {paymentType === 'PAID' && (
                <InputFiled
                  required
                  min={0}
                  label="Payment Range Lower"
                  type="number"
                  placeholder="Payment Range Lower"
                  value={current.payment_range_lower}
                  errorMessage={errors.payment_range_lower?.message}
                  className="my-3"
                  onChange={(e) => {
                    if (e.target.value)
                      handleChange('payment_range_lower', e.target.value);
                  }}
                />
              )}
              {paymentType === 'PAID' && (
                <InputFiled
                  required
                  min={0}
                  label="Payment Range Higher"
                  type="number"
                  placeholder="Payment Range Higher"
                  value={current.payment_range_higher}
                  errorMessage={errors.payment_range_higher?.message}
                  className="my-3"
                  onChange={(e) => {
                    if (e.target.value)
                      handleChange('payment_range_higher', e.target.value);
                  }}
                />
              )}
              {paymentScheme === 'HOURLY' && (
                <InputFiled
                  required
                  min={0}
                  label="Total commitment Lower"
                  type="number"
                  placeholder="Total commitment Lower"
                  value={current.commitment_hours_lower}
                  errorMessage={errors.commitment_hours_lower?.message}
                  className="my-3"
                  onChange={(e) => {
                    if (e.target.value)
                      handleChange('commitment_hours_lower', e.target.value);
                  }}
                />
              )}
              {paymentScheme === 'HOURLY' && (
                <InputFiled
                  required
                  min={0}
                  label="Total commitment higher"
                  type="number"
                  placeholder="Total commitment Higher"
                  value={current.commitment_hours_higher}
                  errorMessage={errors.commitment_hours_higher?.message}
                  className="my-3"
                  onChange={(e) => {
                    if (e.target.value)
                      handleChange('commitment_hours_higher', e.target.value);
                  }}
                />
              )}
            </div>
            <div className="p-4">
              <h1 className="pt-4 text-xl font-semibold text-neutral-300">
                Experience & skills
              </h1>
              <Combobox
                required
                label="Experience level"
                name="experience_level"
                items={experienceLevelOptions}
                placeholder="Experience level"
                className="mt-6"
                onSelected={(e) => handleChange('experience_level', e?.id)}
                selected={experienceLevelOptions?.find(
                  (x) => x?.id === current.experience_level,
                )}
              />
            </div>
          </div>
        </div>
      </FormLayout>
      <div className=" flex items-end justify-end  border-t p-4">
        <Button
          disabled={!isValid}
          type="button"
          onClick={() => onSubmit()}
          className="flex h-11 w-52 items-center justify-center"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default ProjectInfo;
