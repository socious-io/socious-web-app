import {Label} from '@components/atoms/label/label';
import Button from '@components/common/Button/Button';
import InputFiled from '@components/common/InputFiled/InputFiled';
import Modal from '@components/common/Modal/Modal';
import TextArea from '@components/common/TextArea/TextArea';
import {Combobox} from '@components/common';
import {days, months} from '../Experiences.helper';
import {AddModal} from './AddExperience.types';

export const AddExperience: AddModal = (
  modalState,
  bind,
  onCancel,
  onSubmitAdd,
) => {
  return (
    <Modal isOpen={modalState === 'add'}>
      <InputFiled {...bind('title')} className="mb-4" label="Title" />
      <TextArea {...bind('description')} className="mb-4" label="Description" />
      <Label>Start Date</Label>
      <div className="mb-4 flex gap-2">
        <Combobox {...bind('start_at_day')} items={days} placeholder="Day" />
        <Combobox
          {...bind('start_at_month')}
          items={months}
          placeholder="Month"
        />
        <InputFiled {...bind('start_at_year')} placeholder="Year" />
      </div>
      <Label>End Date</Label>
      <div className="mb-4 flex gap-2">
        <Combobox {...bind('end_at_day')} items={days} placeholder="Day" />
        <Combobox
          {...bind('end_at_month')}
          items={months}
          placeholder="Month"
        />
        <InputFiled {...bind('end_at_year')} placeholder="Year" />
      </div>
      <div className="mt-8">
        <Button className="mr-2" onClick={onSubmitAdd}>
          Save
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
