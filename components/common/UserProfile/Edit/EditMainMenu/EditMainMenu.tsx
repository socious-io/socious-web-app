import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  MutableRefObject,
} from 'react';
import {
  Button,
  Chip,
  ImageUploader,
  InputFiled,
  Combobox,
  TextArea,
} from '@components/common';
import profile_img_icon from 'asset/images/user.png';
import {FieldValues, useController, useFormContext} from 'react-hook-form';
import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete';
import {getPhoneCode} from 'services/getPhoneCode';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';
import Image from 'next/future/image';
import editIcon from 'asset/icons/edit.svg';

// Socious Data
import Data, {getText} from '@socious/data';
import {LocationFormFragment} from '@components/organisms/data/location-form-fragment';
const orgTypeData = Object.keys(Data.OrganizationType);

// types
interface EditMainMenuProps {
  goTo: (data: 'SKILLS' | 'CAUSES') => void;
  editProfile: () => void;
  setNewAvatar: React.Dispatch<any>;
  setNewCover: React.Dispatch<any>;
  coverImage?: string;
  avatar?: string;
  observer: MutableRefObject<(() => Promise<unknown>)[]>;
}

const EditMainMenu = ({
  observer,
  goTo,
  editProfile,
  setNewAvatar,
  setNewCover,
  coverImage,
  avatar,
}: EditMainMenuProps) => {
  const formMethods = useFormContext();
  const {
    register,
    control,
    formState,
    watch,
    handleSubmit,
    setValue,
    getValues,
  } = formMethods;
  const [countryKey, setCountryKey] = useState<string>();

  const bio = watch('bio');
  const skills = watch('skills');
  const passions = watch('passions');
  const countryCode = watch('country');
  const selectedCity = watch('city');
  const geoId = watch('geoname_id');
  const countryNumber = watch('countryNumber');
  const userType = watch('userType');

  const regionNames = useMemo(
    () => new Intl.DisplayNames(['en'], {type: 'region'}),
    [
      // TODO: lang
    ],
  );

  //use-places-autocomplete: Method to get countries.
  const {
    suggestions: {data: countries},
    setValue: setCountryValue,
  } = usePlacesAutocomplete({
    requestOptions: {language: 'en', types: ['country']},
    debounce: 300,
    cacheKey: 'country-restricted',
  });
  const filterCountries = useMemo(
    () =>
      countries.map(({place_id, description}) => ({
        id: place_id,
        name: description,
      })) || [{id: '1', name: 'Japan'}],
    [countries],
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

  const handleSetCity = useCallback(
    (data: string | null) => {
      setValue('city', data, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  const handleSetCountry = useCallback(
    (newCountryCode: string | null) => {
      setValue('country', newCountryCode, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (newCountryCode !== countryCode) handleSetCity('');
    },
    [countryCode, handleSetCity, setValue],
  );

  const handleSetCountryNumber = useCallback(
    (data: string) => {
      setValue('countryNumber', data, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

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
    if (countryCode) setCountryKey(countryCode);
  }, [countryCode, regionNames]);

  // Organization Types
  //Passions
  const orgTypes = useMemo(
    () => {
      return orgTypeData.map((id) => ({
        id,
        name: getText('en', `ORGTYPE.${id}`),
      }));
    },
    [
      // todo: language
    ],
  );
  const orgTypeController = useController<FieldValues, string>({
    control: control,
    name: 'type',
  });

  useEffect(() => {
    console.log('observer: ', observer);
    if (observer.current.length === 0) {
      observer.current.push(handleSubmit(editProfile));
    }
  }, []);

  return (
    <>
      <form
        className="hide-scrollbar flex flex-1 flex-col overflow-y-scroll"
        onSubmit={handleSubmit(editProfile)}
      >
        <div className="grow overflow-y-auto">
          <div>
            {/* Images Upload */}
            <div className="relative border-b-2 border-grayLineBased bg-offWhite pb-4">
              <div className="pointer-events-none	absolute left-4 top-4 rounded-md  bg-[#dcdcdc] p-1 text-xs">
                upload profile cover image
              </div>
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
              <div className="relative mx-4 -mt-8">
                <div className="size-1 pointer-events-none absolute left-0 bottom-4 z-10 rounded-md bg-[#dcdcdc] p-1 text-xs">
                  upload profile image
                </div>
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
                {userType === 'users' ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Combobox
                      required
                      controller={orgTypeController}
                      label="Organization Type"
                      name="organization_type"
                      items={orgTypes ?? []}
                      placeholder="Organization Type"
                      errorMessage={formState?.errors?.['type']?.message}
                      className="mt-6"
                    />
                    <InputFiled
                      label="Name"
                      type="text"
                      placeholder="Name"
                      register={register('name')}
                      errorMessage={formState?.errors?.['name']?.message}
                      required
                      className="my-2"
                    />
                  </>
                )}
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
                {/* Mission for users */}
                {userType === 'users' && (
                  <div>
                    <TextArea
                      label="Mission"
                      placeholder="Tell us about your mission"
                      register={register('mission')}
                      errorMessage={formState?.errors?.['mission']?.message}
                      className="my-2 border-2 border-grayLineBased"
                      rows={5}
                    />
                  </div>
                )}
              </div>

              {/* Social causes */}
              <div className="mb-4 mt-12 flex justify-between">
                <h3 className=" text-xl font-semibold text-grayDisableButton">
                  Social causes
                </h3>
                <div
                  className="m-2 h-5 w-5 cursor-pointer"
                  onClick={() => goTo('CAUSES')}
                >
                  <Image
                    src={editIcon}
                    alt={`edit icon`}
                    width={100}
                    height={100}
                  />
                </div>
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
                {userType === 'organizations' && (
                  <InputFiled
                    label="Organization email"
                    type="email"
                    placeholder="Email"
                    register={register('email')}
                    errorMessage={formState?.errors?.['email']?.message}
                    required
                    className="my-6"
                  />
                )}
                <LocationFormFragment
                  country={countryCode}
                  city={selectedCity}
                  geonameId={geoId}
                  setCountry={handleSetCountry}
                  setCity={handleSetCity}
                  setGeonameId={handleSetGeoId}
                  errorCity={formState?.errors?.['city']?.message}
                  errorCountry={formState?.errors?.['country']?.message}
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
                {userType === 'organizations' && (
                  <InputFiled
                    label="Website"
                    type="text"
                    placeholder="Website"
                    register={register('website')}
                    errorMessage={formState?.errors?.['website']?.message}
                    className="my-2"
                  />
                )}
              </div>

              {/* Skills */}
              {userType === 'users' && (
                <div className="mb-20 ">
                  <div className="mb-4 mt-12 flex justify-between">
                    <h3 className=" text-xl font-semibold text-grayDisableButton">
                      Skills
                    </h3>
                    <div
                      className="m-2 h-5 w-5 cursor-pointer"
                      onClick={() => goTo('SKILLS')}
                    >
                      <Image
                        src={editIcon}
                        alt={`edit icon`}
                        width={100}
                        height={100}
                      />
                    </div>
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
              )}

              {/* Company Info only For Organization */}
              {userType === 'organizations' && (
                <>
                  <h3 className="mb-4 text-xl font-semibold text-grayDisableButton">
                    Company Info
                  </h3>
                  <div className="space-y-8">
                    <div>
                      <TextArea
                        label="Mission"
                        placeholder="Tell us about your mission"
                        register={register('mission')}
                        errorMessage={formState?.errors?.['mission']?.message}
                        className="my-2 border-2 border-grayLineBased"
                        rows={5}
                      />
                    </div>
                    <div>
                      <TextArea
                        label="Culture"
                        placeholder="Tell us about your mission"
                        register={register('culture')}
                        errorMessage={formState?.errors?.['culture']?.message}
                        className="my-2 border-2 border-grayLineBased"
                        rows={3}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
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
