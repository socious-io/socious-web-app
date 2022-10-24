import {Experience} from '@components/common/UserProfile/MainContent/Experiences/Experience/Experience';
import Image from 'next/image';
import {addExperience} from '@api/user/experiences/action';
import React, {useState} from 'react';
import Title from '../Title';
import {
  ExperiencePayload,
  ExperiencesProps,
  ModalState,
} from './Experiences.types';
import {initialFormValue} from './Experiences.helper';
import addCircle from '/asset/icons/add-circle.svg';
import {AddExperience} from './AddExperience/AddExperience';
import {EditExperience} from './EditExperience/EditExperience';

export const Experiences = (props: ExperiencesProps): JSX.Element => {
  const [modalState, setModalState] = useState<ModalState>('close');
  const [form, setForm] = useState<typeof initialFormValue>(initialFormValue);

  const bind = (ctrl: keyof typeof initialFormValue) => ({
    value: form[ctrl],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({...form, [ctrl]: e.target.value}),
  });

  const onEditCallback = (experience: ExperiencePayload) => {
    // setForm(experience);
    openEditModal();
  };

  // const adaptor = (day: string, month: string, year: string): string => {
  //   return `${year}-${month}-${day}`;
  // };

  const onSubmitAdd = () => {
    // const payload: ExperiencePayload = {...form, org_id: props.orgId};
    // addExperience(payload).then(console.log).catch(console.log);
    // const newExperience = {...form, org_id: props.orgId};
    // props.add(newExperience);
    setModalState('close');
  };

  const onSubmitEdit = () => {
    // const clone = {...form} as ExperiencePayload;
    // props.update(clone);
    setModalState('close');
  };

  const onCancel = () => {
    setModalState('close');
  };

  const openAddModal = () => {
    resetModal();
    setModalState('add');
  };

  const openEditModal = () => {
    setModalState('edit');
  };

  const resetModal = () => {
    setForm(initialFormValue);
  };

  const experienceList = props.list.map((experience) => (
    <div key={experience.org_id} className="mb-4">
      <Experience onEdit={onEditCallback} value={experience} />
    </div>
  ));

  return (
    <div className="m-4 border-t border-grayLineBased">
      {AddExperience(modalState, bind, onCancel, onSubmitAdd)}
      {EditExperience(modalState, bind, onCancel, onSubmitEdit)}
      <div className="flex">
        <Title>Experiences</Title>
        <div className="ml-auto mt-4" onClick={openAddModal}>
          <Image src={addCircle} alt="add" width={24} height={24} />
        </div>
      </div>
      {experienceList}
    </div>
  );
};
