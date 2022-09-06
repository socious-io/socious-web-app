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
      className="flex flex-col justify-between  px-10    "
    >
      <div className="flex flex-col h-[28rem]">
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

      <div className="h-48  border-t-2 border-b-grayLineBased divide-x -mx-16 ">
        <Button
          className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
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
