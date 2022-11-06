import {Button, InputFiled} from '@components/common';
import React from 'react';
import {useFormContext} from 'react-hook-form';

const AddModal = ({submit, review}: {submit: () => void; review: boolean}) => {
  const formMethods = useFormContext;
  const {
    register,
    formState: {errors, isSubmitting},
    setError,
    handleSubmit,
    watch,
  } = formMethods();

  const expiryDate = watch('expiry_date');

  const beforeSubmit = () => {
    const [expiryMonth, expiryYear] = expiryDate.split('/');
    const currentYear = parseInt(new Date().getFullYear().toString().slice(-2));
    const currentMonth = (new Date().getUTCMonth() + 1).toString();
    if (expiryYear > currentYear || expiryMonth > currentMonth) {
      submit();
    } else {
      setError(
        'expiry_date',
        {
          type: 'expired',
          message: 'Date is already expired.',
        },
        {shouldFocus: true},
      );
    }
  };

  return (
    <form
      className="hide-scrollbar flex flex-1 flex-col overflow-y-scroll"
      onSubmit={handleSubmit(beforeSubmit)}
    >
      <div className="h-[20rem] grow overflow-y-auto">
        <div className="space-y-8 p-4">
          <InputFiled
            label="Cardholder’s name"
            type="text"
            placeholder="Name"
            register={register('name')}
            errorMessage={errors?.['name']?.message}
            required
            className="my-2"
            disabled={review}
          />
          <InputFiled
            label="Card number"
            type="text"
            register={register('card_number')}
            errorMessage={errors?.['card_number']?.message}
            required
            className="my-2"
            disabled={review}
          />
          <div className="my-6 flex space-x-2">
            <InputFiled
              name="Expiry date"
              placeholder="MM/YY"
              label="Expiry date"
              register={register('expiry_date')}
              errorMessage={errors?.['expiry_date']?.message}
              className="basis-6/12"
              required
              disabled={review}
            />
            <InputFiled
              placeholder="***"
              register={register('cvc')}
              errorMessage={errors?.['cvc']?.message}
              className="basis-6/12"
              required
              label="CVC"
              disabled={review}
            />
          </div>
        </div>
      </div>
      <div className=" bottom-0 divide-x border-t-2 border-grayLineBased bg-white p-4 pb-12 sm:sticky sm:pb-4">
        <Button
          className="ml-auto flex w-full items-center justify-center align-middle sm:w-auto sm:max-w-xs sm:px-6"
          type="submit"
          disabled={isSubmitting}
          variant="fill"
          value="Submit"
        >
          Add credit card
        </Button>
      </div>
    </form>
  );
};

export default AddModal;
