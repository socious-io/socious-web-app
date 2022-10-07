import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  Button,
  Chip,
  ImageUploader,
  InputFiled,
  Modal,
  Combobox,
  TextArea,
} from '@components/common';
import {PencilSquareIcon} from '@heroicons/react/24/outline';
import profile_img_icon from 'asset/images/user.png';
import {useFormContext} from 'react-hook-form';
import {getText} from '@socious/data';
import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete';
import {getPhoneCode} from 'services/getPhoneCode';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';
import Image from 'next/future/image';

// types
interface EditMainMenuProps {
  goTo: (data: 'SKILLS' | 'CAUSES') => void;
  editProfile: () => void;
  setNewAvatar: React.Dispatch<any>;
  setNewCover: React.Dispatch<any>;
  coverImage?: string;
  avatar?: string;
}

const EditMainMenu = ({
  goTo,
  editProfile,
  setNewAvatar,
  setNewCover,
  coverImage,
  avatar,
}: EditMainMenuProps) => {
  const formMethods = useFormContext();
  const {register, formState, watch, handleSubmit, setValue, getValues} =
    formMethods;
  const [countryKey, setCountryKey] = useState<string>();
  const [countryName, setCountryName] = useState<any>('');

  const bio = watch('bio');
  const skills = watch('skills');
  const passions = watch('passions');
  const countryCode = watch('country');
  const selectedCity = watch('city');
  const countryNumber = watch('countryNumber');

  const regionNames = useMemo(
    () => new Intl.DisplayNames(['en'], {type: 'region'}),
    [
      // TODO: lang
    ],
  );

  //use-places-autocomplete: Method to get countries.
  const {
    ready: countryReady,
    value: countryValue,
    suggestions: {status: countryStatus, data: countries},
    setValue: setCountryValue,
  } = usePlacesAutocomplete({
    requestOptions: {language: 'en', types: ['country']},
    debounce: 300,
    cacheKey: 'country-restricted',
  });

  //use-places-autocomplete: Method to get cities filtered by country. Returns Full city address.
  const {
    ready: cityReady,
    value: cityValue,
    suggestions: {status: cityStatus, data: cities},
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

  //Creating [] of countries for Combobox
  const filterCountries = useMemo(
    () =>
      countries.map(({place_id, description}) => ({
        id: place_id,
        name: description,
      })) || [{id: '1', name: 'Japan'}],
    [countries],
  );

  // Creating [] of cities for Combobox
  const filterCities = useMemo(
    () =>
      cities.map(({place_id, description, structured_formatting}) => ({
        id: place_id,
        name: structured_formatting.main_text || description,
      })) || [{id: 1, name: 'Tokyo'}],
    [cities],
  );

  //form-hook: Method for applying city to 'city'
  const handleSetCity = useCallback(
    (data: any) => {
      setValue('city', data?.name, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  //form-hook: Method for applying country to 'country'
  const handleSetCountry = useCallback(
    (countryCode: any) => {
      setValue('country', countryCode, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (selectedCity) handleSetCity('');
    },
    [handleSetCity, selectedCity, setValue],
  );

  //form-hook: Method for applying country to 'country'
  const handleSetCountryNumber = useCallback(
    (data: string) => {
      setValue('countryNumber', data, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  //form-hook: Method for applying 'phoneNumber'
  const handleSetPhoneNumber = useCallback(
    (phoneNumber: string) => {
      setValue('phoneNumber', phoneNumber.replaceAll(/[ -]/g, '') || '', {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  // Get 'countryNumber' for default and each 'countryKey' change. i.e. after each 'onCountrySelected'.
  useEffect(() => {
    if (!countryKey) return;
    getPhoneCode(countryKey)
      .then((number) => {
        handleSetCountryNumber(number);
      })
      .catch((error) => console.error(error));
  }, [countryKey, handleSetCountryNumber]);

  // Method to get Country-Code('jp') on countrySelected and calls 'handleSetCountry'.
  const onCountrySelected = useCallback(
    (data: any) => {
      setCountryName(data.name);
      getGeocode({placeId: data.id})
        .then((result: any) => {
          const countryCode =
            result?.[0]?.address_components[0]?.short_name?.toLowerCase();
          handleSetCountry(countryCode);
          // Remove this if no need to change countryNumber
          setCountryKey(countryCode);
        })
        .catch((error: any) => console.error(error));
    },
    [handleSetCountry],
  );

  //Set CountryKey for phoneNumber
  const onCountrySelectedForNumber = useCallback((data: any) => {
    getGeocode({placeId: data.id})
      .then((result: any) => {
        const countryCode =
          result?.[0]?.address_components[0]?.short_name?.toLowerCase();
        setCountryKey(countryCode);
      })
      .catch((error: any) => console.error(error));
  }, []);

  //Set Default Country when country is available.
  useEffect(() => {
    if (countryCode)
      setCountryName(regionNames.of(countryCode?.toUpperCase() ?? 'JP'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form
        className="hide-scrollbar flex flex-1 flex-col overflow-y-scroll"
        onSubmit={handleSubmit(editProfile)}
      >
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <Modal.Description>
          <div className="grow overflow-y-auto">
            {/* Images Upload */}
            <div className="border-b-2 border-grayLineBased bg-offWhite pb-4">
              <ImageUploader
                onChange={(file: any) => setNewCover(file)}
                src={coverImage}
                withPreview={false}
                className="h-32 w-full rounded-none"
              >
                {(setOpen: any, imagePreviewUrl: any) => (
                  <div
                    className="h-32 w-full overflow-hidden bg-[#959595]"
                    onClick={setOpen}
                  >
                    {imagePreviewUrl && (
                      <Image
                        src={imagePreviewUrl}
                        alt="Make a social impact"
                        width="100"
                        height="100"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </div>
                )}
              </ImageUploader>
              <div className="mx-4 -mt-8">
                <ImageUploader
                  onChange={(file: any) => setNewAvatar(file)}
                  src={avatar ?? profile_img_icon}
                  className="h-32 w-32 border border-grayLineBased bg-[#959595]"
                ></ImageUploader>
              </div>
            </div>
            {/* Main Form */}
            <div className="px-4 py-8">
              {/* Name, Username, Bio */}
              <h3 className="mb-4 text-xl font-semibold text-grayDisableButton">
                Basic info
              </h3>
              <div className="space-y-8">
                <InputFiled
                  label="First name"
                  type="text"
                  placeholder="First name"
                  register={register('firstName')}
                  errorMessage={formState?.errors?.['firstName']?.message}
                  required
                  className="my-2"
                />
                <InputFiled
                  label="Last name"
                  type="text"
                  placeholder="Last name"
                  register={register('lastName')}
                  errorMessage={formState?.errors?.['lastName']?.message}
                  required
                  className="my-2"
                />
                <InputFiled
                  label="Username"
                  type="text"
                  placeholder="Username"
                  register={register('userName')}
                  errorMessage={formState?.errors?.['userName']?.message}
                  required
                  className="my-2"
                />
                <div>
                  <TextArea
                    label="Bio"
                    placeholder="Write bio"
                    register={register('bio')}
                    errorMessage={formState?.errors?.['bio']?.message}
                    className="my-2 border-2 border-grayLineBased"
                    rows={3}
                    required
                  />
                  <p className="text-sm text-graySubtitle">
                    {bio?.length ?? 0} / 160
                  </p>
                </div>
              </div>

              {/* Social Causes */}
              <div className="mb-4 mt-12 flex justify-between">
                <h3 className=" text-xl font-semibold text-grayDisableButton">
                  Social Causes
                </h3>
                <PencilSquareIcon
                  className="m-2 w-5 text-primary"
                  onClick={() => goTo('CAUSES')}
                />
              </div>
              <div className="min-h-[144px] rounded-lg border border-grayLineBased p-3">
                <div className="flex flex-wrap gap-2">
                  {passions?.map((passion: string) => (
                    <Chip
                      key={passion}
                      content={getText('en', `PASSION.${passion}`)}
                    />
                  ))}
                </div>
              </div>
              {formState?.errors?.['passions']?.message && (
                <div className="flex items-center text-error">
                  <>
                    <ExclamationCircleIcon className="mr-1 h-5 w-5" />
                    {formState?.errors?.['passions']?.message}
                  </>
                </div>
              )}

              {/* Contact */}
              <h3 className="mb-4 mt-6 text-xl font-semibold text-grayDisableButton">
                Contact
              </h3>
              <div className="space-y-8">
                {/* Commenting out bc BE doesn't like it. Will have different process for changing it. */}
                {/* <InputFiled
                  label="Email"
                  type="email"
                  placeholder="Email"
                  register={register('email')}
                  errorMessage={formState?.errors?.['email']?.message}
                  required
                  className="my-6"
                /> */}
                <Combobox
                  label="Country"
                  onSelected={onCountrySelected}
                  selected={{id: countryCode ?? 123, name: countryName}}
                  onChange={(e) => setCountryValue(e.currentTarget.value || '')}
                  required
                  name="country"
                  items={filterCountries}
                  placeholder="Country"
                  errorMessage={formState?.errors?.['country']?.message}
                  className="my-6"
                />
                <Combobox
                  label="City"
                  selected={{id: countryCode ?? 123, name: selectedCity}}
                  onSelected={handleSetCity}
                  onChange={(e) => setCitiesValue(e.currentTarget.value || '')}
                  required
                  name="city"
                  items={filterCities}
                  placeholder="City"
                  errorMessage={formState?.errors?.['city']?.message}
                  className="my-6"
                />
                <InputFiled
                  label="Address"
                  type="text"
                  placeholder="Address"
                  register={register('address')}
                  errorMessage={formState?.errors?.['address']?.message}
                  className="my-2"
                />
                <div>
                  <label
                    htmlFor="Phone number"
                    className="my-2 block text-base font-semibold sm:text-sm"
                  >
                    Phone number
                  </label>
                  <div className="flex space-x-5">
                    <Combobox
                      selected={{id: countryKey, name: countryNumber}}
                      onChange={(e) =>
                        setCountryValue(e.currentTarget.value || '')
                      }
                      onSelected={onCountrySelectedForNumber}
                      items={filterCountries}
                      name="countryNumber"
                      placeholder="countryNumber"
                      errorMessage={
                        formState?.errors?.['countryNumber']?.message
                      }
                      className="basis-3/12"
                    />
                    <InputFiled
                      placeholder="Phone number"
                      value={getValues('phoneNumber')}
                      onChange={(e) =>
                        handleSetPhoneNumber(e.currentTarget.value || '')
                      }
                      errorMessage={formState?.errors?.['phoneNumber']?.message}
                      className="basis-9/12"
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-20 ">
                <div className="mb-4 mt-12 flex justify-between">
                  <h3 className=" text-xl font-semibold text-grayDisableButton">
                    Skills
                  </h3>
                  <PencilSquareIcon
                    className="m-2 w-5 text-primary"
                    onClick={() => goTo('SKILLS')}
                  />
                </div>
                <div className="min-h-[144px] rounded-lg border border-grayLineBased p-3">
                  <div className="flex flex-wrap gap-2">
                    {skills?.map((skill: string) => (
                      <Chip
                        key={skill}
                        content={getText('en', `SKILL.${skill}`)}
                      />
                    ))}
                  </div>
                </div>
                {formState?.errors?.['skills']?.message && (
                  <div className="flex items-center text-error">
                    <>
                      <ExclamationCircleIcon className="mr-1 h-5 w-5" />
                      {formState?.errors?.['skills']?.message}
                    </>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Description>
        <div className=" bottom-0 divide-x border-t-2 border-grayLineBased bg-white p-4 pb-12 sm:sticky sm:pb-4">
          <Button
            className="ml-auto flex w-full items-center justify-center align-middle sm:w-auto sm:max-w-xs "
            type="submit"
            variant="fill"
            value="Submit"
          >
            Save changes
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditMainMenu;