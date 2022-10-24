import {ModalState} from '../Experiences.types';
import {initialFormValue} from '../Experiences.helper';

export type Bind = (bind: keyof typeof initialFormValue) => {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export type EditModal = (
  modalState: ModalState,
  bind: Bind,
  onCancel: () => void,
  onSubmitEdit: () => void,
) => JSX.Element;
