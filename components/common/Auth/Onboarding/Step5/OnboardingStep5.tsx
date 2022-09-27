import {Button} from '@components/common';
import {StepProps} from '@models/stepProps';
import {useCallback, useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {geocodeByPlaceId} from 'react-google-places-autocomplete';
import AutoCompleteInput from '@components/common/AutoCompleteInput/AutoCompleteInput';

const OnboardingStep5 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, setValue, getValues, watch} = formMethods;

  const [countryKey, setCountryKey] = useState<any>('Japan');

  const selectedCountry = watch('country');
  const selectedCity = watch('city');

  const handleSetCountry = useCallback(
    (data: any) => {
      setValue('country', data, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );
  const handleSetCity = useCallback(
    (data: any) => {
      setValue('city', data?.label, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  const onCountrySelected = useCallback(
    (data: any) => {
      handleSetCountry(data.label);
      geocodeByPlaceId(data.value.place_id)
        .then((data: any) => {
          setCountryKey(
            data?.[0]?.address_components[0]?.short_name?.toLowerCase(),
          );
        })
        .catch((error: any) => console.error(error));
    },
    [handleSetCountry],
  );

  return (
    <form
      onSubmit={handleSubmit(() => onSubmit(countryKey))}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:pl-10"
    >
      <div className="flex flex-col">
        {' '}
        <h1 className="font-helmet">What’s your location?</h1>
        <p className="text-base text-graySubtitle">
          Connect with other like-minded individuals and organizations around
          you
        </p>
        <AutoCompleteInput
          selected={selectedCountry}
          onSelected={onCountrySelected}
          label="Country"
          errorMessage={formState?.errors?.['country']?.message}
          autocompletionRequest={{
            types: ['country'],
          }}
        />
        {selectedCountry}
        <AutoCompleteInput
          selected={selectedCity}
          onSelected={handleSetCity}
          label="City"
          errorMessage={formState?.errors?.['country']?.message}
          autocompletionRequest={{
            types: ['locality', 'administrative_area_level_3'],
            componentRestrictions: {
              country: [countryKey],
            },
          }}
        />
      </div>

      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pl-10 sm:pl-0">
        <Button
          className="m-auto mt-4 mb-12 flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep5;
