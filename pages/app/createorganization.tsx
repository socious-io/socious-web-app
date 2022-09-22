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

const CreateOrganization = () => {
  const [step, setStep] = useState<number>(0);

  // back function of carousel
  const backHandler = () => {
    if (step > 0) {
      setStep((step) => step - 1);
    }else if(step===0){
      console.log('go Home')
    }
  };

  // next function
  const nextHandler = () => {
    if (step < 8) {
      setStep((step) => step + 1);
    }
  };

  const goHome =()=>{
    console.log('go Home')
  }

  const handleSubmit=()=>{
    if(step===6){
      console.log('api')
      nextHandler()
    }else if(step===8){
      console.log('go organization profile')
      
    }else{
      nextHandler()
    }
  }


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
          <Starter onSubmit={handleSubmit} onBack={backHandler}/>
        ) : step === 1 ? (
          <OrganizationType onSubmit={handleSubmit} />
        ) : step === 2 ? (
          <SocialCauses onSubmit={handleSubmit} />
        ) : step === 3 ? (
          <BasicInfo onSubmit={handleSubmit} />
        ) : step === 4 ? (
          <Mission onSubmit={handleSubmit} />
        ) : step === 5 ? (
          <Culture onSubmit={handleSubmit} />
        ) : step === 6 ? (
          <SocialImpact onSubmit={handleSubmit} />
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
