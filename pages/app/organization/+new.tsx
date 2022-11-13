import React, {useState, memo} from 'react';
import {useRouter} from 'next/router';

// components
import Carousel from '../../../components/common/CreateOrganization/components/Carousel';
import {Modal, Button} from '@components/common';

// steps of create organization
import SocialCauses from '../../../components/common/CreateOrganization/steps/SocialCauses';
import OrganizationType from '../../../components/common/CreateOrganization/steps/OrganizationType';
import BasicInfo from '../../../components/common/CreateOrganization/steps/BasicInfo';
import Culture from '../../../components/common/CreateOrganization/steps/Culture';
import SocialImpact from '../../../components/common/CreateOrganization/steps/SocialImpact';
import CreateSuccessfully from '../../../components/common/CreateOrganization/steps/CreateSuccessfully';
import VerifyOrganization from '../../../components/common/CreateOrganization/steps/VerifyOrganization';
import Starter from '../../../components/common/CreateOrganization/steps/Starter';
import Mission from '../../../components/common/CreateOrganization/steps/Mission';

// validation Schema
import {schemaCreateOrganization} from '@api/createorganization/validation';

//libraries
import {useForm, FormProvider} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {AxiosError} from 'axios';
import {Libraries, useGoogleMapsScript} from 'use-google-maps-script';

//actions
import {create_organization} from '@api/createorganization/actions';

//request functions
import {DefaultErrorMessage, ErrorMessage} from 'utils/request';

//interfaces
import {CreateOrganizationType} from '@models/createOrganization';

//libraries for GoogleMaps
const libraries: Libraries = ['places'];

const CreateOrganization = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMessage, setError] = useState<ErrorMessage>();
  const [step, setStep] = useState<number>(0);
  const [company_name, set_company_name] = useState<string>();

  const router = useRouter();
  const methods = useForm({
    resolver: joiResolver(schemaCreateOrganization),
  });

  //Loading Map
  const {isLoaded, loadError} = useGoogleMapsScript({
    googleMapsApiKey: process.env['NEXT_PUBLIC_GOOGLE_API_KEY'] ?? '',
    libraries,
  });

  ///////////////////////////////////////////////////////////////////////////
  //   ********************     functions     *****************************//
  ///////////////////////////////////////////////////////////////////////////

  const handleSubmit = (data: CreateOrganizationType) => {
    if (step === 6) {
      requestHandler(data);
    } else {
      nextHandler();
    }
  };

  const requestHandler = async (data: CreateOrganizationType) => {
    try {
      const response = await create_organization(data);
      //set organization name
      set_company_name(response?.name);
      nextHandler();
    } catch (e) {
      const error = e as AxiosError<any>;
      let msg = DefaultErrorMessage;
      if (error.isAxiosError) {
        if (error.response?.data?.error === 'Not matched')
          msg = {
            title: 'Invalid login',
            message: 'Email or password is incorrect',
          };
      }
      setError(msg);
      setShowModal(!showModal);
    }
  };

  const backHandler = () => {
    if (step > 0) {
      setStep((step) => step - 1);
    } else if (step === 0) {
      goHome();
    }
  };

  const nextHandler = () => {
    if (step < 8) {
      setStep((step) => step + 1);
    } else if (step === 8) {
      goHome();
    }
  };

  const goHome = () => {
    router.push('/app');
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
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
            skip={step === 4 || step === 5 ? true : false}
          />
        )}

        {/* steps of create organization */}
        {step === 0 ? (
          <Starter onSubmit={nextHandler} onBack={backHandler} />
        ) : step === 7 && company_name ? (
          <CreateSuccessfully name={company_name} onSubmit={nextHandler} />
        ) : step === 8 ? (
          <VerifyOrganization onSubmit={nextHandler} />
        ) : null}

        <FormProvider {...methods}>
          {step === 1 ? (
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
          ) : null}
        </FormProvider>
      </div>

      {/* show modal for error */}
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
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
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
    </div>
  );
};

export default memo(CreateOrganization);
