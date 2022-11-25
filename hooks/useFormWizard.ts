import {useCallback, useState} from 'react';
import {FieldValues, useForm, UseFormReturn} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';

export interface FormWizardData {
  step: number;
  setStep: (step: number) => void;
  advance: () => void;
  back: () => void;
  // schemas: Array<any>;
  methods: Array<UseFormReturn<FieldValues, any>>;
}

export interface FormWizardOptions {
  // schemas?: Array<any>;
  methods?: Array<UseFormReturn<FieldValues, any>>;
}

export function useFormWizard(options: FormWizardOptions): FormWizardData {
  const {
    // schemas = [],
    methods = [],
  } = options;

  const [step, setStep] = useState<number>(0);
  const advance = useCallback(() => {
    setStep(step + 1);
  }, [step, setStep]);
  const back = useCallback(() => {
    if (step > 0) setStep(step - 1);
  }, [step, setStep]);

  return {
    step,
    setStep,
    advance,
    back,
    // schemas,
    methods,
  };
}
