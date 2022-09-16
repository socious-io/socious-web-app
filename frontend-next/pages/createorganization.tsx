import React, {useState} from 'react';

// components
import Button from '../components/common/Button/Button';
import Carousel from '../components/common/CreateOrganization/components/Carousel';

// steps of create organization
import SocialCauses from '../components/common/CreateOrganization/steps/SocialCauses';
import OrganizationType from '../components/common/CreateOrganization/steps/OrganizationType';
import BasicInfo from '../components/common/CreateOrganization/steps/BasicInfo';
import Culture from '../components/common/CreateOrganization/steps/Culture';
import Impact from '../components/common/CreateOrganization/steps/Impact';
import CreateSuccessfully from '../components/common/CreateOrganization/steps/CreateSuccessfully';
import VerifyOrganization from '../components/common/CreateOrganization/steps/VerifyOrganization';
import Starter from '../components/common/CreateOrganization/steps/Starter';

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
          <Starter />
        ) : step === 1 ? (
          <OrganizationType />
        ) : step === 2 ? (
          <SocialCauses />
        ) : step === 3 ? (
          <BasicInfo />
        ) : step === 4 ? (
          <BasicInfo />
        ) : step === 5 ? (
          <Culture />
        ) : step === 6 ? (
          <Impact />
        ) : step === 7 ? (
          <CreateSuccessfully />
        ) : step === 8 ? (
          <VerifyOrganization />
        ) : null}

        <footer className="flex pt-6 pb-28 sm:pb-10 sm:pt-4 justify-center border-grayLineBased border-t">
          <Button
            onClick={nextHandler}
            className="w-8/12 flex justify-center py-1.5 font-medium"
          >
            continue
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default CreateOrganization;
