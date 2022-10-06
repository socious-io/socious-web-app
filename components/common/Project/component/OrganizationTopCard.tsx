import {Avatar, Chip} from '@components/common';
import {Project} from 'models/project';
import {Modal, Button} from '@components/common';
import {useToggle} from '@hooks';
import {FormProvider, useForm} from 'react-hook-form';
import ApplyStep1 from '../Apply/Step1/ApplyStep1';
import {useState, useMemo} from 'react';
import ApplyStep2 from '../Apply/Step2/ApplyStep2';
import ApplyStep4 from '../Apply/Step4/ApplyStep4';
import useUser from 'hooks/useUser/useUser';
import {getText} from '@socious/data';
import {
  MapPinIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

function OrganizationTopCard({
  title,
  country_id,
  project_type,
  payment_range_higher,
  payment_range_lower,
  remote_preference,
  project_length,
  experience_level,
}: Project) {
  const {state: showApply, handlers: setShowApply} = useToggle();

  const [step, setStep] = useState<number>(1);
  const formMethodsStep1 = useForm({});
  const {identities} = useUser({redirect: false});
  const projectType = getText('en', `PROJECT.${project_type}`);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row space-x-2">
          <Avatar size="l" />
          <div className="flex flex-col justify-center">
            <p className="text-black">{projectType || ''}</p>
            <p className="text-graySubtitle">{country_id || ''}</p>
          </div>
        </div>
      </div>
      <div className="">
        <p className="font-semibold">{title}</p>
      </div>
      <div className="mt-4 flex space-x-5">
        {country_id && (
          <div className="flex flex-row">
            <MapPinIcon width={20} height={20} className="text-primary" />
            <p className="ml-2 text-sm text-graySubtitle">{country_id}</p>
          </div>
        )}
        {projectType && (
          <div className="flex flex-row">
            <CalendarDaysIcon width={20} height={20} className="text-primary" />
            <p className="ml-2 text-sm text-graySubtitle">{projectType}</p>
          </div>
        )}
        {(payment_range_lower || payment_range_higher) && (
          <div className="flex flex-row">
            <CurrencyDollarIcon
              width={20}
              height={20}
              className="text-primary"
            />
            <p className="pl-2 text-sm text-graySubtitle ">{`$${
              payment_range_lower || ''
            }-$${payment_range_higher || ''}`}</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex space-x-5">
        {/* <p className="pl-2 text-sm text-graySubtitle ">{experience_level}</p> */}
        {remote_preference && (
          <p className="pl-2 text-sm text-graySubtitle ">
            {getText('en', `PROJECT.${remote_preference}`)}
          </p>
        )}
        {project_length && (
          <div className="flex flex-row">
            <ClockIcon width={20} height={20} className="text-primary" />
            <p className="pl-2 text-sm text-graySubtitle">
              {getText('en', `PROJECT.${project_length}`)}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        {identities !== null && (
          <Button
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
            onClick={() => setShowApply.on()}
          >
            Apply now
          </Button>
        )}
      </div>
      {/* Add Post Modal */}
      <Modal isOpen={showApply} onClose={() => setShowApply.off()}>
        <FormProvider {...formMethodsStep1}>
          {step == 1 ? (
            <ApplyStep1
              onSubmit={() => {
                setStep(4);
              }}
              onAttach={() => {
                setStep(2);
              }}
            />
          ) : step == 2 ? (
            <ApplyStep2
              onSubmit={() => {}}
              onAttach={() => {
                setShowApply.off();
                setStep(1);
              }}
            />
          ) : (
            <ApplyStep4
              onSubmit={() => {}}
              onAttach={() => {
                setShowApply.off();
                setStep(1);
              }}
            />
          )}
        </FormProvider>
      </Modal>
    </div>
  );
}

export default OrganizationTopCard;
