import type {NextPage} from 'next';
import {GetStaticProps} from 'next';
import {useCallback, useMemo, useState} from 'react';
import {Button, Modal} from '@components/common';
import {twMerge} from 'tailwind-merge';
import OnboardingStep1 from '@components/common/Auth/Onboarding/Step1/OnboardingStep1';
import OnboardingStep2 from '@components/common/Auth/Onboarding/Step2/OnboardingStep2';
import OnboardingStep3 from '@components/common/Auth/Onboarding/Step3/OnboardingStep3';
import OnboardingStep4 from '@components/common/Auth/Onboarding/Step4/OnboardingStep4';
import OnboardingStep5 from '@components/common/Auth/Onboarding/Step5/OnboardingStep5';
import OnboardingStep6 from '@components/common/Auth/Onboarding/Step6/OnboardingStep6';
import OnboardingStep7 from '@components/common/Auth/Onboarding/Step7/OnboardingStep7';
import OnboardingStep8 from '@components/common/Auth/Onboarding/Step8/OnboardingStep8';
import OnboardingStep9 from '@components/common/Auth/Onboarding/Step9/OnboardingStep9';
import OnboardingStep10 from '@components/common/Auth/Onboarding/Step10/OnboardingStep10';

import {useForm, FormProvider} from 'react-hook-form';

import {joiResolver} from '@hookform/resolvers/joi';

import {Libraries, useGoogleMapsScript} from 'use-google-maps-script';

import {
  schemaOnboardingStep3,
  schemaOnboardingStep4,
  schemaOnboardingStep5,
  schemaOnboardingStep6,
  schemaOnboardingStep7,
  schemaOnboardingStep8,
} from '@api/auth/validation';
import {updateProfile} from '@api/auth/actions';
import useUser from 'hooks/useUser/useUser';
import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import getGlobalData from 'services/cacheSkills';
import {uploadMedia} from '@api/media/actions';
import {AxiosError} from 'axios';
import {DefaultErrorMessage, ErrorMessage} from 'utils/request';

const schemaStep = {
  3: schemaOnboardingStep3,
  4: schemaOnboardingStep4,
  5: schemaOnboardingStep5,
  6: schemaOnboardingStep6,
  7: schemaOnboardingStep7,
  8: schemaOnboardingStep8,
};

type OnBoardingProps = {
  skills: any[];
};

// IMP: This needs to be constant.
const libraries: Libraries = ['places'];

const Onboarding: NextPage<OnBoardingProps> = ({skills}) => {
  //Loading Map
  const {isLoaded, loadError} = useGoogleMapsScript({
    googleMapsApiKey: process.env['NEXT_PUBLIC_GOOGLE_API_KEY'] ?? '',
    libraries,
  });

  const {user} = useUser();
  const [errorMessage, setError] = useState<ErrorMessage>();

  const [step, setStep] = useState<number>(7);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [placeId, setPlaceId] = useState<string>('');

  const handleBack = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const handleToggleModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const formMethodsStep3 = useForm({
    mode: 'all',
    resolver: joiResolver(schemaStep[3]),
    defaultValues: {
      passions: [],
    },
  });
  const formMethodsStep4 = useForm({
    mode: 'all',
    resolver: joiResolver(schemaStep[4]),
    defaultValues: {
      skills: [],
    },
  });

  const formMethodsStep5 = useForm({resolver: joiResolver(schemaStep[5])});
  const formMethodsStep6 = useForm({
    defaultValues: {
      availableProject: 'true',
    },
    resolver: joiResolver(schemaStep[6]),
  });
  const formMethodsStep7 = useForm({
    defaultValues: {
      countryNumber: '+81',
    },
    resolver: joiResolver(schemaStep[7]),
  });
  const formMethodsStep8 = useForm({
    resolver: joiResolver(schemaStep[8]),
  });
  const formMethodsStep9 = useForm();

  const handleSubmit = (data: any) => {
    if (step === 5) {
      console.log({
        country: formMethodsStep5.getValues('country'),
        city: formMethodsStep5.getValues('city'),
      });
      setPlaceId(data);
      setStep(step + 1);
    } else if (step === 8) {
      handleUpdateProfileRequest();
    } else if (step === 9) {
      handleImageUpload(data);
    } else if (step === 10) {
      handleToggleModal();
    } else {
      setStep(step + 1);
    }
  };

  const handleImageUpload = useCallback(
    async (file: any) => {
      const formData = new FormData();
      formData.append('file', file);
      let media_id: string;
      try {
        const response: any = await uploadMedia(formData);
        media_id = response.id;
      } catch (e) {
        const error = e as AxiosError<any>;
        let msg = DefaultErrorMessage;
        if (error.isAxiosError) {
          if (error?.code === 'ERR_NETWORK')
            msg = {
              title: 'Image size is too large.',
              message: 'Please, try again with smaller sized image.',
            };
        }
        setError(msg);
        handleToggleModal();
        return;
      }

      try {
        const profileBody: any = {
          first_name: user?.first_name,
          last_name: user?.last_name,
          username: user?.username,
        };
        profileBody.avatar = media_id;
        updateProfile(profileBody).then((response) => {
          setStep(step + 1);
        });
      } catch (error) {
        setError(DefaultErrorMessage);
        handleToggleModal();
      }
    },
    [handleToggleModal, step, user],
  );

  const handleUpdateProfileRequest = useCallback(() => {
    const bio = formMethodsStep8.getValues('bio');
    const passions = formMethodsStep3.getValues('passions');
    const city = formMethodsStep5.getValues('city');

    const skills = formMethodsStep4.getValues('skills');

    if (user === undefined) return;

    const profileBody: any = {
      first_name: user?.first_name,
      last_name: user?.last_name,
      username: user?.username,
      social_causes: passions,
      skills: skills,
    };

    console.log('PROFILE BODY :---: ', profileBody);
    if (bio) profileBody.bio = bio;
    if (city) profileBody.city = city;
    updateProfile(profileBody)
      .then(() => {
        setStep(step + 1);
      })
      .catch((e) => {
        console.log('error: 1st update', e);
        setError(DefaultErrorMessage);
        handleToggleModal();
      });
  }, [
    formMethodsStep8,
    formMethodsStep3,
    formMethodsStep5,
    formMethodsStep4,
    user,
    step,
    handleToggleModal,
  ]);

  const handleNext = useCallback(() => {
    if (step === 8) {
      handleUpdateProfileRequest();
    } else {
      setStep(step + 1);
    }
  }, [handleUpdateProfileRequest, step]);

  return (
    <div
      className={twMerge(
        'mx-auto flex min-h-screen w-screen flex-col items-stretch justify-between border border-grayLineBased px-6 pt-12 sm:my-auto sm:h-[calc(100vh-theme(space.24))] sm:min-h-0 sm:max-w-xl sm:rounded-3xl sm:py-7',
        step === 10 ? ' bg-primary' : 'bg-background',
      )}
    >
      <div className="relative flex h-14 justify-center">
        <Modal isOpen={showModal} onClose={handleToggleModal}>
          <Modal.Title>
            <h2 className="text-center text-error">{errorMessage?.title}</h2>
          </Modal.Title>
          <Modal.Description>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{errorMessage?.message}</p>
            </div>
          </Modal.Description>
          <div className="mt-4">
            <Button
              className="m-auto mt-4 flex w-full max-w-xs items-center justify-center align-middle "
              type="submit"
              size="lg"
              variant="fill"
              value="Submit"
              onClick={handleToggleModal}
            >
              Close
            </Button>
          </div>
        </Modal>

        {![1, 10].includes(step) && (
          <span
            className="absolute left-0 cursor-pointer"
            title="Back"
            onClick={handleBack}
          >
            <ChevronLeftIcon className="h-5 w-5 cursor-pointer" />
          </span>
        )}
        <div className="flex h-20 pt-1">
          {[3, 4, 5, 6, 7, 8, 9].includes(step) &&
            [3, 4, 5, 6, 7, 8, 9].map((stepNumber) => (
              <div key={`stepper-${stepNumber}`} className="flex">
                <span
                  className={twMerge(
                    'mx-1 h-3 w-3 cursor-pointer rounded-3xl  border border-grayLineBased ',
                    stepNumber === step && 'bg-primary',
                  )}
                />
              </div>
            ))}
        </div>
        {[6, 7, 8].includes(step) && (
          <span
            className="absolute right-0 cursor-pointer text-base text-primary"
            title="Next"
            onClick={handleNext}
          >
            Skip
          </span>
        )}
      </div>

      {step === 1 && <OnboardingStep1 onSubmit={handleSubmit} />}
      {step === 2 && <OnboardingStep2 onSubmit={handleSubmit} />}
      <FormProvider {...formMethodsStep3}>
        {step === 3 && <OnboardingStep3 onSubmit={handleSubmit} />}
      </FormProvider>
      <FormProvider {...formMethodsStep4}>
        {step === 4 && (
          <OnboardingStep4 onSubmit={handleSubmit} rawSkills={skills} />
        )}
      </FormProvider>

      <FormProvider {...formMethodsStep5}>
        {step === 5 && <OnboardingStep5 onSubmit={handleSubmit} />}
      </FormProvider>
      <FormProvider {...formMethodsStep6}>
        {step === 6 && <OnboardingStep6 onSubmit={handleSubmit} />}
      </FormProvider>
      <FormProvider {...formMethodsStep7}>
        {step === 7 && (
          <OnboardingStep7 onSubmit={handleSubmit} defaultCountry={placeId} />
        )}
      </FormProvider>
      <FormProvider {...formMethodsStep8}>
        {step === 8 && <OnboardingStep8 onSubmit={handleSubmit} />}
      </FormProvider>
      <FormProvider {...formMethodsStep9}>
        {step === 9 && <OnboardingStep9 onSubmit={handleSubmit} />}
      </FormProvider>
      {step === 10 && <OnboardingStep10 onSubmit={handleSubmit} />}
    </div>
  );
};

export default Onboarding;

export const getStaticProps: GetStaticProps = async () => {
  const skills = await getGlobalData();
  return {props: {skills}, revalidate: 60 * 60 * 24};
};
