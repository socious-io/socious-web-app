import React, {useState} from 'react';

// components
import Carousel from '../../components/common/CreateOrganization/components/Carousel';

// steps of create organization
import SocialCauses from '../../components/common/CreateOrganization/steps/SocialCauses';
import OrganizationType from '../../components/common/CreateOrganization/steps/OrganizationType';
import BasicInfo from '../../components/common/CreateOrganization/steps/BasicInfo';
import Culture from '../../components/common/CreateOrganization/steps/Culture';
import SocialImpact from '../../components/common/CreateOrganization/steps/SocialImpact';
import CreateSuccessfully from '../../components/common/CreateOrganization/steps/CreateSuccessfully';
import VerifyOrganization from '../../components/common/CreateOrganization/steps/VerifyOrganization';
import Starter from '../../components/common/CreateOrganization/steps/Starter';
import Mission from '../../components/common/CreateOrganization/steps/Mission';

// validation Schema
import {validate} from '@socious/data';

//libraries
import {useForm, FormProvider} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';

const CreateOrganization = () => {
  const [step, setStep] = useState<number>(0);

  const methods = useForm({
    resolver: joiResolver(validate.OrganizationSchema),
  });

  ///////////////////////////////////////////////////////////////////////////
  //   ********************     functions     *****************************//
  ///////////////////////////////////////////////////////////////////////////

  const handleSubmit = () => {
    if (step === 6) {
      requestHandler();
      nextHandler();
    } else if (step === 8) {
      console.log('go organization profile');
    } else {
      nextHandler();
    }
  };

  const requestHandler = () => {
    const name = methods.getValues('name');
    const bio = methods.getValues('bio');
    const email = methods.getValues('email');
    const phone = methods.getValues('phone');
    const type = methods.getValues('type');
    const city = methods.getValues('city');
    const address = methods.getValues('address');
    const country = methods.getValues('country');
    const social_causes = methods.getValues('social_causes');
    const website = methods.getValues('website');
    const mobile_country_code = methods.getValues('mobile_country_code');
    const mission = methods.getValues('mission');
    const culture = methods.getValues('culture');
  };

  const backHandler = () => {
    if (step > 0) {
      setStep((step) => step - 1);
    } else if (step === 0) {
      console.log('go Home');
    }
  };

  const nextHandler = () => {
    if (step < 8) {
      setStep((step) => step + 1);
    }
  };

  const goHome = () => {
    console.log('go Home');
  };

  ///////////////////////////////////////////////////////////////////////////
  //   ***********************     layout     *****************************//
  ///////////////////////////////////////////////////////////////////////////

  return (
    <div className="absolute top-0 left-0 flex h-screen w-screen items-center justify-center bg-clearWhite">
      <div className="flex h-full w-screen flex-col bg-white sm:h-5/6 sm:max-w-lg sm:rounded-3xl ">
        {/* steps carousel */}
        {step === 0 || step === 7 || step === 8 ? null : (
          <Carousel
            onBack={backHandler}
            onSkip={nextHandler}
            step={step}
            skip={step === 4 || step === 5 || step === 6 ? true : false}
          />
        )}

        {/* steps of create organization */}
        {step === 0 ? (
          <Starter onSubmit={handleSubmit} onBack={backHandler} />
        ) : step === 1 ? (
          <FormProvider {...methods}>
            <OrganizationType onSubmit={handleSubmit} />
          </FormProvider>
        ) : step === 2 ? (
          <FormProvider {...methods}>
            <SocialCauses onSubmit={handleSubmit} />
          </FormProvider>
        ) : step === 3 ? (
          <FormProvider {...methods}>
            <BasicInfo onSubmit={handleSubmit} />
          </FormProvider>
        ) : step === 4 ? (
          <FormProvider {...methods}>
            <Mission onSubmit={handleSubmit} />
          </FormProvider>
        ) : step === 5 ? (
          <FormProvider {...methods}>
            <Culture onSubmit={handleSubmit} />
          </FormProvider>
        ) : step === 6 ? (
          <FormProvider {...methods}>
            <SocialImpact onSubmit={handleSubmit} />
          </FormProvider>
        ) : step === 7 ? (
          <CreateSuccessfully onSubmit={handleSubmit} />
        ) : step === 8 ? (
          <VerifyOrganization onSubmit={handleSubmit} />
        ) : null}
      </div>
    </div>
  );
};

export default CreateOrganization;
