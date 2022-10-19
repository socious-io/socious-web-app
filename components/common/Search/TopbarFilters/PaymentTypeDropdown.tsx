import {FC} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Button, Dropdown} from '@components/common';
import {Menu} from '@headlessui/react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {PaymentTypeOptions} from '../SidebarFilters/PaymentTypeOptions';

interface PaymentTypeFormProps {
  onSubmit: (data: FieldValues) => void;
  renderButton?: () => JSX.Element;
}

export const PaymentTypeForm: FC<PaymentTypeFormProps> = ({
  onSubmit,
  renderButton,
}) => {
  const methods = useForm();

  const onSubmitPayment = (data: FieldValues) => {
    onSubmit(data);
  };

  const renderDefaultButton = () => (
    <div className="flex justify-center py-3">
      <Button type="submit">Confirm</Button>
    </div>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitPayment)}>
        <div className="w-[350px] p-5">
          <PaymentTypeOptions />
        </div>
        <hr />
        {renderButton ? renderButton() : renderDefaultButton()}
      </form>
    </FormProvider>
  );
};

interface PaymentTypeDropdownProps {
  onChange: (values: FieldValues) => void;
}

export const PaymentTypeDropdown: FC<PaymentTypeDropdownProps> = ({
  onChange,
}) => {
  return (
    <Dropdown
      display={
        <Button
          size="sm"
          variant="ghost"
          rightIcon={() => <ChevronDownIcon className="w-4" />}
        >
          Payment type
        </Button>
      }
    >
      <PaymentTypeForm
        onSubmit={onChange}
        renderButton={() => (
          <Menu.Item>
            <div className="flex justify-center py-3">
              <Button type="submit">Confirm</Button>
            </div>
          </Menu.Item>
        )}
      />
    </Dropdown>
  );
};
