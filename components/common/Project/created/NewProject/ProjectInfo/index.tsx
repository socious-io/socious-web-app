import React, {FC, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import Title from '@components/common/CreateOrganization/components/Title';
import InputFiled from '@components/common/InputFiled/InputFiled';
import TextArea from '@components/common/TextArea/TextArea';
import {Combobox} from '@components/common';
import useGetData from '../../../../../../hooks/useGetData';
import {joiResolver} from '@hookform/resolvers/joi';
import {schemaCreateProjectStep3} from '@api/projects/validation';
import {useProjectContext} from '../context';
import {FromLayout} from '../Layout';
import {TOnSubmit} from '../sharedType';
import {Button} from '@components/common';
import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete';

const ProjectInfo: FC<TOnSubmit> = ({onSubmit}) => {
  const {setProjectContext, ProjectContext} = useProjectContext();

  const {
    setValue,
    watch,
    formState: {errors, isValid, isDirty},
  } = useForm({
    resolver: joiResolver(schemaCreateProjectStep3),
    defaultValues: {
      title: ProjectContext.title,
      description: ProjectContext.description,
      remote_preference: ProjectContext.remote_preference,
      payment_type: ProjectContext.payment_type,
      payment_scheme: ProjectContext.payment_scheme,
      payment_currency: ProjectContext.payment_currency,
      payment_range_lower: ProjectContext.payment_range_lower,
      payment_range_higher: ProjectContext.payment_range_higher,
      commitment_hours_higher: ProjectContext.commitment_hours_higher,
      commitment_hours_lower: ProjectContext.commitment_hours_lower,
      project_type: ProjectContext.project_type,
      project_length: ProjectContext.project_length,
      country: ProjectContext.country,
      city: ProjectContext.city,
    },
  });

  const {items} = useGetData();

  const paymentType = watch('payment_type');
  const paymentScheme = watch('payment_scheme');
  const countryCode = watch('country');

  const handleChange = (field: any, input: string) => {
    setValue(field, input, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setProjectContext({
      ...ProjectContext,
      [field]: input,
    });
  };

  const {
    value: countryValue,
    suggestions: {data: countries},
    setValue: setCountryValue,
  } = usePlacesAutocomplete({
    requestOptions: {language: 'en', types: ['country']},
    debounce: 300,
    cacheKey: 'country-restricted',
  });
  const {
    value: cityValue,
    suggestions: {data: cities},
    setValue: setCitiesValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      language: 'en',
      types: ['locality', 'administrative_area_level_3'],
      componentRestrictions: {country: countryCode},
    },
    debounce: 300,
    cacheKey: `${countryCode}-restricted`,
  });

  const filterCountries = useMemo(
    () =>
      countries.map(({place_id, description}) => ({
        id: place_id,
        name: description,
      })) || [{id: '1', name: 'Japan'}],
    [countries],
  );
  const filterCities = useMemo(
    () =>
      cities.map(({place_id, description, structured_formatting}) => ({
        id: place_id,
        name: structured_formatting.main_text || description,
      })) || [{id: 1, name: 'Tokyo'}],
    [cities],
  );

  const handleSetCity = (data: any) => {
    setValue('city', data?.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setProjectContext({
      ...ProjectContext,
      city: data?.name,
    });
  };

  const onCountrySelected = async (data: any) => {
    let countryCode = '';
    try {
      if (data.name !== 'Worldwide') {
        const res = await getGeocode({placeId: data.id});

        countryCode =
          res?.[0]?.address_components?.[0]?.short_name?.toLowerCase();
      } else {
        countryCode = 'XW';
      }
      setValue('country', countryCode, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setProjectContext({
        ...ProjectContext,
        country: countryCode,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex h-full w-full flex-col">
      <FromLayout>
        <div className="overflow-y-scroll">
          <Title description="Describe your project in detail." border>
            Tell us more about your project.
          </Title>
          <div className="px-4 pt-4 text-xl font-semibold text-neutral-300">
            {ProjectContext.isEditModalOpen ? 'Project edit' : 'Project info'}
          </div>
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
              required
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
              required
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
            <Combobox
              required
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
            {paymentType === 'PAID' && (
              <InputFiled
                required
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
            )}
            {paymentType === 'PAID' && (
              <InputFiled
                required
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
            )}
            <Combobox
              required
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
            {paymentScheme === 'HOURLY' && (
              <InputFiled
                required
                min={0}
                label="Total commitment Lower"
                type="number"
                placeholder="Total commitment Lower"
                value={ProjectContext.commitment_hours_lower}
                errorMessage={errors?.['commitment_hours_lower']?.message}
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
                value={ProjectContext.commitment_hours_higher}
                errorMessage={errors?.['commitment_hours_higher']?.message}
                className="my-3"
                onChange={(e) => {
                  if (e.target.value)
                    handleChange('commitment_hours_higher', e.target.value);
                }}
              />
            )}
            <Combobox
              label="Country"
              onSelected={(e) => onCountrySelected(e)}
              selected={items.countries?.find(
                (x) =>
                  x?.id.toLowerCase() === ProjectContext.country.toLowerCase(),
              )}
              onChange={(e) => setCountryValue(e.target.value)}
              required
              name="country"
              errorMessage={errors?.['country']?.message}
              items={
                countryValue.toLowerCase().includes?.('wo')
                  ? [{id: 'XW', name: 'Worldwide'}]
                  : filterCountries
              }
              placeholder="Country"
              className="my-6"
            />
            {ProjectContext.country !== 'XW' && (
              <Combobox
                label="City"
                selected={
                  ProjectContext.isEditModalOpen
                    ? {id: ProjectContext.city, name: ProjectContext.city}
                    : {id: ProjectContext.city, name: ProjectContext.city}
                }
                errorMessage={errors?.['city']?.message}
                onSelected={(e) => handleSetCity(e)}
                onChange={(e) => setCitiesValue(e.currentTarget.value)}
                required
                name="city"
                items={filterCities}
                placeholder="City"
                className="my-6"
              />
            )}
          </div>
        </div>
      </FromLayout>
      <div className=" flex items-end justify-end  border-t p-4">
        {ProjectContext.isEditModalOpen ? (
          <>
            <Button
              disabled={!isValid}
              type="button"
              onClick={() => onSubmit('ACTIVE')}
              className="'flex h-11 w-44 items-center justify-center"
            >
              Save and publish
            </Button>
            <Button
              disabled={!isDirty || ProjectContext.status !== 'DRAFT'}
              variant="outline"
              type="button"
              onClick={() => onSubmit('DRAFT')}
              className="ml-2 flex h-11 w-36 items-center justify-center"
            >
              Save draft
            </Button>
          </>
        ) : (
          <Button
            disabled={!isValid}
            type="button"
            onClick={() => onSubmit()}
            className="flex h-11 w-52 items-center justify-center"
          >
            Continue
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProjectInfo;
