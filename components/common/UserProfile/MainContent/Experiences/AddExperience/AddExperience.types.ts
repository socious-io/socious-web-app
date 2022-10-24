import {Bind} from '../EditExperience/EditExperience.types';
import {ModalState} from '../Experiences.types';

export type AddModal = (
  modalState: ModalState,
  bind: Bind,
  onCancel: () => void,
  onSubmitAdd: () => void,
) => JSX.Element;
