import {schemaOfferApplicant} from '@api/applicants/validation';
import Button from '@components/common/Button/Button';
import Combobox from '@components/common/Combobox/Combobox';
import InputFiled from '@components/common/InputFiled/InputFiled';
import Modal from '@components/common/Modal/Modal';
import TextArea from '@components/common/TextArea/TextArea';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {joiResolver} from '@hookform/resolvers/joi';
import {
  FieldValues,
  useController,
  useForm,
  useFormContext,
} from 'react-hook-form';

// Socious Data
import Data, {getText} from '@socious/data';
import {useMemo} from 'react';
const projectPaymentType = Object.keys(Data.ProjectPaymentType);
const projectPaymentSchemeType = Object.keys(Data.ProjectPaymentSchemeType);

// Types
type HireApplicantModalProps = {
  modalState: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
};
const HireApplicantModal = ({
  modalState,
  onSubmit,
  onClose,
}: HireApplicantModalProps) => {
  const {handleSubmit, register, formState, control} = useFormContext();

  const paymentTypeItemsController = useController<FieldValues, string>({
    control: control,
    name: 'payment_type',
  });

  const paymentSchemaController = useController<FieldValues, string>({
    control: control,
    name: 'payment_scheme',
  });

  const projectPaymentTypeItems = useMemo(() => {
    return projectPaymentType.map((id) => ({
      id,
      name: getText('en', `PAYMENT.${id}`),
    }));
  }, []);

  const projectPaymentSchemeTypeItems = useMemo(() => {
    return projectPaymentSchemeType.map((id) => ({
      id,
      name: getText('en', `PAYMENT.${id}`),
    }));
  }, []);

  return (
    <Modal
      isOpen={modalState}
      onClose={onClose}
      className="-m-4 flex h-screen w-screen max-w-2xl flex-col rounded-none p-0 sm:m-0 sm:max-h-[45rem] sm:w-full sm:max-w-md sm:rounded-2xl"
    >
      <div className="sticky top-0">
        <Modal.Title>
          <h3 className="font-worksans border-b border-offsetColor pt-12 pb-3.5 text-center text-xl font-semibold sm:pt-8">
            Hire applicant
          </h3>
        </Modal.Title>
        {/* Cross */}
        <span
          className="absolute top-12 right-3 cursor-pointer sm:top-9"
          onClick={onClose}
        >
          <XMarkIcon className="w-6" />
        </span>
      </div>
      <form
        className="hide-scrollbar flex flex-1 flex-col overflow-y-scroll"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Modal.Description>
          <div className="grow overflow-y-auto">
            <p className="p-4">An offer will be sent to Name.</p>
            {/* Main Form */}
            <div className="border-t border-offsetColor px-4 pb-8 pt-4">
              <div className="space-y-6">
                <Combobox
                  controller={paymentTypeItemsController}
                  label="Payment type"
                  required
                  name="paymentType"
                  items={projectPaymentTypeItems ?? []}
                  placeholder="Payment type"
                  errorMessage={formState?.errors?.['payment_type']?.message}
                  className="mb-6"
                />
                <Combobox
                  controller={paymentSchemaController}
                  label="Payment mode"
                  required
                  name="paymentType"
                  items={projectPaymentSchemeTypeItems ?? []}
                  placeholder="Payment mode"
                  errorMessage={formState?.errors?.['payment_scheme']?.message}
                  className="my-6"
                />
                <InputFiled
                  label="Due date"
                  type="date"
                  placeholder="DD/MM/YYYY"
                  register={register('due_date')}
                  errorMessage={formState?.errors?.['due_date']?.message}
                  className="my-2"
                  required
                />
                <InputFiled
                  label="Estimated total hours"
                  type="number"
                  placeholder="hrs"
                  register={register('total_hours')}
                  errorMessage={formState?.errors?.['total_hours']?.message}
                  className="my-2"
                  required
                />
                <InputFiled
                  label="Assignment Total"
                  type="text"
                  placeholder="$"
                  register={register('assignment_total')}
                  errorMessage={
                    formState?.errors?.['assignment_total']?.message
                  }
                  required
                  className="my-2"
                />
                <p className="text-graySubtitle">
                  Prices will be shown in USD ($)
                </p>
                <div className="-mx-4 border-t p-4">
                  <TextArea
                    label="Message"
                    placeholder="Write message"
                    register={register('offer_message')}
                    errorMessage={formState?.errors?.['offer_message']?.message}
                    className="my-2 border-2 border-grayLineBased"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Description>
        <div className="bottom-0 divide-x border-t-2 border-grayLineBased bg-white p-4 pb-12 pt-20 sm:sticky sm:pt-4 sm:pb-4">
          <Button
            className="mx-auto flex w-full items-center justify-center align-middle sm:max-w-xs "
            type="submit"
            variant="fill"
            value="Submit"
          >
            Send Offer
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default HireApplicantModal;
