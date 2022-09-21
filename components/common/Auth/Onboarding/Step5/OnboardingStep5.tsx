import {Button} from '@components/common';
import Combobox from '@components/common/Combobox/Combobox';
import {StepProps} from '@models/stepProps';
import {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import useLocation from 'services/useLocation';
import useSWR from 'swr';

const OnboardingStep5 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, setValue, getValues, watch} = formMethods;

  const {getCountryByKeyword, getCityByKeyword} = useLocation();

  const [countryKey, setCountryKey] = useState('Japan');
  const [cityKey, setCityKey] = useState('');

  const selectedCountry = watch('country');

  const {data: filterCountries} = useSWR(
    [`getCountryByKeyword`, countryKey],
    () => getCountryByKeyword(countryKey || 'Japan'),
  );

  const {data: filterCities} = useSWR(
    [`getCityByKeyword`, selectedCountry],
    () => getCityByKeyword(selectedCountry, cityKey),
  );

  const handleSetCountry = (data: any) => {
    setValue('country', data, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const handleSetCity = (data: any) => {
    setValue('city', data, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:grow-0 sm:pl-10"
    >
      <div className="flex h-[28rem] flex-col">
        {' '}
        <h1 className="font-helmet  ">What’s your location?</h1>
        <p className="text-base text-graySubtitle">
          Connect with other like-minded individuals and organizations around
          you
        </p>
        <Combobox
          label="Country"
          selected={getValues('country')}
          onSelected={handleSetCountry}
          onChangeInputSearch={setCountryKey}
          required
          name="country"
          items={filterCountries || [{id: 1, name: 'Istanbul'}]}
          placeholder="Country"
          errorMessage={formState?.errors?.['country']?.message}
          className="my-6"
        />
        {selectedCountry?.name}
        <Combobox
          label="City"
          selected={getValues('city')}
          onSelected={handleSetCity}
          onChangeInputSearch={setCityKey}
          required
          name="city"
          items={filterCities || [{id: 1, name: 'Turkey'}]}
          placeholder="City"
          errorMessage={formState?.errors?.['city']?.message}
          className="my-6"
        />
      </div>

      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pl-10 sm:h-48 sm:pl-0">
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
