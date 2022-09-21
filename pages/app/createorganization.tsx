import React, {useState} from 'react';

// components
import Carousel from '../../components/common/CreateOrganization/components/Carousel';

// steps of create organization
import SocialCauses from '../../components/common/CreateOrganization/steps/SocialCauses';
import OrganizationType from '../../components/common/CreateOrganization/steps/OrganizationType';
import BasicInfo from '../../components/common/CreateOrganization/steps/BasicInfo';
import Culture from '../../components/common/CreateOrganization/steps/Culture';
import Impact from '../../components/common/CreateOrganization/steps/Impact';
import CreateSuccessfully from '../../components/common/CreateOrganization/steps/CreateSuccessfully';
import VerifyOrganization from '../../components/common/CreateOrganization/steps/VerifyOrganization';
import Starter from '../../components/common/CreateOrganization/steps/Starter';
import Mission from '../../components/common/CreateOrganization/steps/Mission';

const CreateOrganization = () => {
  const [step, setStep] = useState<number>(0);

  // back function of carousel
  const backHandler = () => {
    if (step > 0) {
      setStep((step) => step - 1);
    }
  };

  // next function
  const nextHandler = () => {
    if (step < 8) {
      setStep((step) => step + 1);
    }
  };

  return (
    <div className="absolute top-0 left-0 flex h-screen w-screen items-center justify-center bg-clearWhite">
      <div className="flex h-full w-screen flex-col bg-white sm:h-5/6 sm:max-w-lg sm:rounded-3xl ">
        {/* steps carousel */}
        {step === 0 || step === 7 || step === 8 ? null : (
          <Carousel
            onPress={backHandler}
            step={step}
            skip={step === 4 || step === 5 || step === 6 ? true : false}
          />
        )}

        {/* steps of create organization */}
        {step === 0 ? (
          <Starter onSubmit={nextHandler} />
        ) : step === 1 ? (
          <OrganizationType onSubmit={nextHandler} />
        ) : step === 2 ? (
          <SocialCauses onSubmit={nextHandler} />
        ) : step === 3 ? (
          <BasicInfo onSubmit={nextHandler} />
        ) : step === 4 ? (
          <Mission onSubmit={nextHandler} />
        ) : step === 5 ? (
          <Culture onSubmit={nextHandler} />
        ) : step === 6 ? (
          <Impact onSubmit={nextHandler} />
        ) : step === 7 ? (
          <CreateSuccessfully onSubmit={nextHandler} />
        ) : step === 8 ? (
          <VerifyOrganization onSubmit={nextHandler} />
        ) : null}
      </div>
    </div>
  );
};

export default CreateOrganization;
