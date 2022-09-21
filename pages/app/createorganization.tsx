import React, {useState} from 'react';

// components
import Button from '../../components/common/Button/Button';
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
import Mission from '@components/common/CreateOrganization/steps/Mission';

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
    <div className="bg-clearWhite w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
      <div className="bg-white w-screen h-full sm:max-w-lg sm:h-5/6 sm:rounded-3xl flex flex-col ">
        {step === 0 ? null : <Carousel onPress={backHandler} step={step} />}

        {step === 0 ? (
          <Starter onSubmit={nextHandler} />
        ) : step === 1 ? (
          <OrganizationType onSubmit={nextHandler} />
        ) : step === 2 ? (
          <SocialCauses onSubmit={nextHandler} />
        ) : step === 3 ? (
          <BasicInfo onSubmit={nextHandler}/>
        ) : step === 4 ? (
          <Mission onSubmit={nextHandler} />
        ) : step === 5 ? (
          <Culture onSubmit={nextHandler}/>
        ) : step === 6 ? (
          <Impact onSubmit={nextHandler}/>
        ) : step === 7 ? (
          <CreateSuccessfully />
        ) : step === 8 ? (
          <VerifyOrganization />
        ) : null}

       
      </div>
    </div>
  );
};

export default CreateOrganization;
