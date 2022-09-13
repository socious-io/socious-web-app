import type {NextPage} from 'next';
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

import {ChevronLeftIcon} from '@heroicons/react/outline';

import {useForm, FormProvider} from 'react-hook-form';

import {joiResolver} from '@hookform/resolvers/joi';

import {
  schemaOnboardingStep3,
  schemaOnboardingStep4,
  schemaOnboardingStep5,
  schemaOnboardingStep6,
  schemaOnboardingStep7,
  schemaOnboardingStep8,
} from '@api/auth/validation';
import { get, post } from 'utils/request';
import { updateProfile } from '@api/user/actions';
import { UpdateProfileBodyType } from '@models/user';
import useUser from 'hooks/useUser/useUser';

const schemaStep = {
  3: schemaOnboardingStep3,
  4: schemaOnboardingStep4,
  5: schemaOnboardingStep5,
  6: schemaOnboardingStep6,
  7: schemaOnboardingStep7,
  8: schemaOnboardingStep8,
};

type User = {
  first_name: string;
  last_name: string;
  username: string;
}
const Onboarding: NextPage = () => {
  const {user}= useUser();

  console.log("USER", user);

  const [step, setStep] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);


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
    }
  });
  const formMethodsStep4 = useForm({
    mode: 'all',
    resolver: joiResolver(schemaStep[4]),
    defaultValues: {
      skills: [],
    }
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
      countryNumber: {id: 1, name: 'Japan'},
    },
    resolver: joiResolver(schemaStep[7]),
  });
  const formMethodsStep8 = useForm({
    resolver: joiResolver(schemaStep[8]),
  });
  const formMethodsStep9 = useForm();

  const handleSubmit = (data: any) => {
    if (step === 8) {
      handleUpdateProfileRequest();
    } else if (step === 9) {
      handleImageUpload();
    } else if (step === 10) {
      handleToggleModal();
    }
    else {
      setStep(step + 1);
    }
  };

  const handleImageUpload = useCallback(async () => {
    const avatar = formMethodsStep9.getValues('file');
    const formData = new FormData();
    formData.append("file", avatar, avatar.name);
    post("/api/v2/media/upload", formData, {
      "Content-Type": "multipart/form-data",
      "Current-Identity": "b5dbfb0a-cbe7-49f2-8154-bfcdcca2754c",
    }).then(response => {
      console.log("RESPONSE", response)
      // make another update with reponse id.

    })
    .catch((error) => console.log("ERROR", error.response));

  }, [formMethodsStep9]);

  const handleUpdateProfileRequest = useCallback(() => {
    const bio = formMethodsStep8.getValues('bio');
    const city = formMethodsStep5.getValues('city');
    // const passions = formMethodsStep3.getValues('passions')
    // Waiting for new githubpackage with enum and types
    const passions = ["SOCIAL", "POVERTY", "HOMELESSNESS", "HUNGER", "HEALTH",];
    const skills = formMethodsStep4.getValues('skills');

    if (user === undefined) return

    const profileBody: UpdateProfileBodyType = {
      "first_name": user?.first_name,
      "last_name": user?.last_name,
      "username": user?.username,
      "social_causes": passions,
      "skills": skills,
    }
    if (bio) profileBody.bio = bio;

    updateProfile(profileBody).then(() => {
      setStep(step + 1);
    }).catch((error: any) => console.error(error))
  }, [user, formMethodsStep4, formMethodsStep5, formMethodsStep8, step]);

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
        'w-screen sm:max-w-xl h-screen sm:h-[45rem] flex flex-col items-stretch sm:block mx-auto -my-10 sm:my-auto sm:rounded-3xl py-7 px-6 border border-grayLineBased',
        step === 10 ? ' bg-primary' : 'bg-background',
      )}
    >
      <div className="flex  justify-center  h-20 relative">
        <Modal isOpen={showModal} onClose={handleToggleModal}>
          <Modal.Title>Title</Modal.Title>
          <Modal.Description>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit de.
              </p>
            </div>
          </Modal.Description>
          <div className="mt-4">
            <Button
              className="max-w-xs w-full m-auto flex items-center justify-center align-middle mt-4 "
              type="submit"
              size="lg"
              variant="fill"
              value="Submit"
              //disabled={!!formState[step]?.errors}
            >
              Ok
            </Button>
          </div>
        </Modal>

        {![1, 10].includes(step) && (
          <span
            className="cursor-pointer absolute left-0"
            title="Back"
            onClick={handleBack}
          >
            <ChevronLeftIcon className="w-5 h-5 cursor-pointer" />
          </span>
        )}
        <div className="flex h-20 pt-1">
          {[3, 4, 5, 6, 7, 8, 9].includes(step) &&
            [3, 4, 5, 6, 7, 8, 9].map((stepNumber) => (
              <div key={`stepper-${stepNumber}`} className="flex">
                <span
                  className={twMerge(
                    'w-3 h-3 mx-1 cursor-pointer rounded-3xl  border border-grayLineBased ',
                    stepNumber === step && 'bg-primary',
                  )}
                />
              </div>
            ))}
        </div>
        {[6, 7, 8].includes(step) && (
          <span
            className="cursor-pointer absolute right-0 text-primary text-base"
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
        {step === 4 && <OnboardingStep4 onSubmit={handleSubmit} />}
      </FormProvider>


      <FormProvider {...formMethodsStep5}>
        {step === 5 && <OnboardingStep5 onSubmit={handleSubmit} />}
      </FormProvider>
      <FormProvider {...formMethodsStep6}>
        {step === 6 && <OnboardingStep6 onSubmit={handleSubmit} />}
      </FormProvider>
      <FormProvider {...formMethodsStep7}>
        {step === 7 && <OnboardingStep7 onSubmit={handleSubmit} />}
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
