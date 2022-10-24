import {Label} from '@components/atoms/label/label';
import Button from '@components/common/Button/Button';
import InputFiled from '@components/common/InputFiled/InputFiled';
import Modal from '@components/common/Modal/Modal';
import TextArea from '@components/common/TextArea/TextArea';
import {Combobox} from '@components/common';
import {days} from '../Experiences.helper';
import {EditModal} from './EditExperience.types';

export const EditExperience: EditModal = (
  modalState,
  bind,
  onCancel,
  onSubmitEdit,
) => {
  return (
    <Modal isOpen={modalState === 'edit'}>
      <InputFiled {...bind('title')} className="mb-4" label="Title" />
      <TextArea {...bind('description')} className="mb-4" label="Description" />
      <Label>Start Date</Label>
      <div className="mb-4 flex gap-2">
        <Combobox {...bind('start_at')} items={days} placeholder="Day" />
        <Combobox items={days} placeholder="Month" />
        <Combobox items={days} placeholder="Year" />
      </div>
      <Label>End Date</Label>
      <div className="mb-4 flex gap-2">
        <Combobox {...bind('end_at')} items={days} placeholder="Day" />
        <Combobox items={days} placeholder="Month" />
        <Combobox items={days} placeholder="Year" />
      </div>
      <div className="mt-8 flex">
        <Button className="mr-2" onClick={onSubmitEdit}>
          Save
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className="ml-auto border-0 text-red-500"
          variant="outline"
          onClick={onCancel}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
