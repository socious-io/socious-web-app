import CreateProjectLayout from '../Layout';
import React, {FC, useState, useEffect} from 'react';
import {Button} from '@components/common';
import ProjectAbout from '../ProjectAbout';
import ProjectQuestions from '../ProjectQuestions';
import ProjectReview from '../ProjectReview';
import QuestionDetail from '../QuestionDetail';
import Congrats from '../Congrats';
import {useForm, FormProvider} from 'react-hook-form';
import ProjectInfo from '../ProjectInfo';
import styles from './index.module.scss';
import {joiResolver} from '@hookform/resolvers/joi';
import {
  schemaCreateProjectStep1,
  schemaCreateProjectStep2,
  schemaCreateProjectQuestion,
} from '@api/projects/validation';
type TLayoutType = {
  onClose: () => void;
  isOpen: boolean;
};

const schemaStep = {
  1: schemaCreateProjectStep1,
  2: schemaCreateProjectStep2,
  3: schemaCreateProjectQuestion,
};
const CreateProjectMain: FC<TLayoutType> = ({onClose, isOpen}) => {
  const [formStep, setFormStep] = useState(0);
  const isStep0 = formStep === 0;
  const isStep1 = formStep === 1;
  const isStep2 = formStep === 2;
  const isStep3 = formStep === 3;
  const isStep4 = formStep === 4;
  const isStep5 = formStep === 5;

  const method1 = useForm({
    resolver: joiResolver(schemaStep[1]),
    mode: 'all',
  });
  const method2 = useForm({
    resolver: joiResolver(schemaStep[2]),
    mode: 'all',
  });
  const method3 = useForm({
    resolver: joiResolver(schemaStep[3]),
    mode: 'all',
  });

  const getMethod = () => {
    if (isStep0) return method1;
    if (isStep1) return method2;
    if (isStep5) return method3;
    return method1;
  };

  const {
    handleSubmit,
    getValues,
    formState: {isValid},
  } = getMethod();
  console.log('@@@@@@');

  console.log(getValues());

  const onSubmit = (data: any) => {
    // console.log(data);
    setFormStep((formStep) => formStep + 1);
  };

  const PageDisplay = () => {
    if (isStep0) {
      return <ProjectAbout />;
    } else if (isStep1) {
      return <ProjectInfo />;
    } else if (isStep2) {
      return <ProjectQuestions setFormStep={() => setFormStep(4)} />;
    } else if (isStep3) {
      return <ProjectReview />;
    } else if (isStep4) {
      return <Congrats onClose={onClose} />;
    } else if (isStep5) {
      return <QuestionDetail setFormStep={() => setFormStep(2)} />;
    }
  };

  return (
    <CreateProjectLayout
      title={isStep4 ? '' : 'Create Project'}
      onClose={onClose}
      isOpen={isOpen}
      setFormStep={setFormStep}
      formStep={formStep}
    >
      <FormProvider {...getMethod()}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col "
        >
          <div
            className={`flex overflow-y-scroll border-b ${
              !(isStep4 || isStep3) ? styles.FormBase : 'h-full'
            }`}
          >
            {PageDisplay()}
          </div>
          {!(isStep4 || isStep3) && (
            <div className=" flex h-20 items-end justify-end p-4">
              <Button
                disabled={!isValid}
                type="submit"
                className={`flex h-11 ${
                  isStep2 || isStep3 ? 'w-36' : 'w-52'
                }  items-center justify-center`}
              >
                {isStep3 ? 'Create' : 'Continue'}
              </Button>
              {(isStep2 || isStep3) && (
                <Button
                  variant="outline"
                  type="button"
                  className="ml-2 flex h-11 w-36 items-center justify-center"
                >
                  {isStep2 ? 'Skip' : 'Save project'}
                </Button>
              )}
            </div>
          )}
        </form>
      </FormProvider>
    </CreateProjectLayout>
  );
};

export default CreateProjectMain;
