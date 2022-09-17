import type {NextPage} from 'next';
import {useState} from 'react';
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

import {ChevronLeftIcon} from '@heroicons/react/24/outline';

import {useForm, FormProvider} from 'react-hook-form';

import {joiResolver} from '@hookform/resolvers/joi';

import {
  schemaOnboardingStep5,
  schemaOnboardingStep6,
  schemaOnboardingStep7,
  schemaOnboardingStep8,
} from 'api/auth/validation';
import useUser from 'hooks/useUser/useUser';

const schemaStep = {
  5: schemaOnboardingStep5,
  6: schemaOnboardingStep6,
  7: schemaOnboardingStep7,
  8: schemaOnboardingStep8,
};

const Onboarding: NextPage = () => {
  const [step, setStep] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  // const {updateProfile} = useUser();

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

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

  const handleSubmit = (data: any) => {
    if (step === 8) {
      handleUpdateProfileRequest();
    }
    if (step === 10) {
      handleToggleModal();
    } else {
      setStep(step + 1);
    }
  };
  const handleUpdateProfileRequest = () => {
    const biography = formMethodsStep8.getValues('bio');
    const city = formMethodsStep5.getValues('city');

    const user = {bio: biography, city: city?.name};

    // updateProfile(user).then(() => {
    setStep(step + 1);
    // });
  };

  return (
    <div
      className={twMerge(
        'm-auto h-[45rem]  max-w-xl rounded-3xl border border-grayLineBased bg-background py-7 px-6',
        step === 10 ? ' bg-primary' : 'bg-background',
      )}
    >
      <div className="relative  flex  h-20 justify-center">
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
              className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
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
      {step === 3 && <OnboardingStep3 onSubmit={handleSubmit} />}
      {step === 4 && <OnboardingStep4 onSubmit={handleSubmit} />}
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
      {step === 9 && <OnboardingStep9 onSubmit={handleSubmit} />}
      {step === 10 && <OnboardingStep10 onSubmit={handleSubmit} />}
    </div>
  );
};

export default Onboarding;
