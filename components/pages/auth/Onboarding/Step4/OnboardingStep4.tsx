// Packages
import {useCallback, useState} from 'react';
import {useFormContext} from 'react-hook-form';

//Components
import {Button} from '@components/common';
import {LocationFormFragment} from '@components/organisms/data/location-form-fragment';

// Type
import {StepProps} from '@models/stepProps';

const OnboardingStep4 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, setValue, formState, watch} = formMethods;

  const selectedCountryCode = watch('country');
  const selectedCity = watch('city');
  const selectedGeoId = watch('geoname_id');

  const handleSetCity = useCallback(
    (data: string | null) => {
      setValue('city', data, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  const handleSetGeoId = useCallback(
    (data: number | null) => {
      setValue('geoname_id', data, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  const handleSetCountry = useCallback(
    (countryCode: string | null) => {
      setValue('country', countryCode, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (selectedCity && selectedCountryCode !== countryCode)
        handleSetCity('');
    },
    [handleSetCity, selectedCity, selectedCountryCode, setValue],
  );

  return (
    <form
      onSubmit={handleSubmit(() => onSubmit(selectedCountryCode))}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:pl-10"
    >
      <div className="flex flex-col">
        {' '}
        <h1 className="font-helmet">What&apos;s your location?</h1>
        <p className="text-base text-graySubtitle">
          Connect with other like-minded individuals and organizations around
          you
        </p>
        <LocationFormFragment
          country={selectedCountryCode}
          city={selectedCity}
          geonameId={selectedGeoId}
          setCountry={handleSetCountry}
          setCity={handleSetCity}
          setGeonameId={handleSetGeoId}
          errorCity={formState?.errors?.['city']?.message}
          errorCountry={formState?.errors?.['country']?.message}
        />
      </div>
      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pl-10 pb-12 sm:pl-0">
        <Button
          className="m-auto mt-4 flex w-full max-w-xs items-center justify-center align-middle "
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

export default OnboardingStep4;
