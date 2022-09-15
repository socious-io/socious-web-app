import React, {useState} from 'react';

// components
import Button from '../Button/Button';
import Carousel from './components/Carousel';

// steps of create organization
import AddSocialCauses from './steps/SocialCauses';
import OrganizationType from './steps/OrganizationType';
import BasicInfo from './steps/BasicInfo';
import Culture from './steps/Culture';
import Impact from './steps/Impact';
import CreateSuccessfully from './steps/CreateSuccessfully';
import VerifyOrganization from './steps/VerifyOrganization';

const CreateOrganization = () => {
  const [step, setStep] = useState<number>(8);

  // back function of carousel
  const backHandler = () => {
    if (step > 1) {
      setStep((step) => step - 1);
    }
  };

  return (
    <div className="bg-clearWhite w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
      <div className="bg-white w-full h-full min-w-360 md:w-4/12 md:h-4/5 md:rounded-3xl flex flex-col ">
        <Carousel onPress={backHandler} step={step} />

        {step === 1 ? (
          <OrganizationType />
        ) : step === 2 ? (
          <AddSocialCauses />
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

        <footer className="flex pt-4 pb-10 justify-center border-grayLineBased border-t">
          <Button className="w-8/12 flex justify-center py-1.5 font-medium">
            continue
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default CreateOrganization;
