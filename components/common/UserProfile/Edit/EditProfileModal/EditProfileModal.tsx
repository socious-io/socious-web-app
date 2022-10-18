// Packages
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {twMerge} from 'tailwind-merge';
import useSWRInfinite from 'swr/immutable';
import {FormProvider, useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';

// Components
import {Modal} from '@components/common';
import EditSubMenu from '../EditSubMenu/EditSubMenu';
import EditMainMenu from '../EditMainMenu/EditMainMenu';
import {get} from 'utils/request';

// Icons
import {ChevronLeftIcon, XMarkIcon} from '@heroicons/react/24/solid';

// Validation
import {schemaProfileUpdate} from '@api/user/validation';

// custom hooks/functions
import {updateProfile} from '@api/auth/actions';
import {checkAndUploadMedia} from 'services/ImageUpload';

// Socious Data
import Data, {getText} from '@socious/data';
const passionData = Object.keys(Data.SocialCauses);

// Types
import {UpdateProfileBodyType} from '@models/profile';
import {mutate} from 'swr';
import Router from 'next/router';
import {useUser} from '@hooks';
import {close} from 'inspector';
interface EditProfileModalProps {
  openState: boolean;
  user: any;
  closeModal: () => void;
}

const EditProfileModal = ({
  openState,
  user,
  closeModal,
}: EditProfileModalProps) => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [editState, setEditState] = useState<'MAIN' | 'CAUSES' | 'SKILLS'>(
    'MAIN',
  );

  const {mutateUser} = useUser();
  const [avatar, setAvatar] = useState<any>();
  const [coverImage, setCoverImage] = useState<any>();

  useEffect(() => {
    if (user) {
      setAvatar(user?.avatar?.id ?? null);
      setCoverImage(user?.cover_image?.id ?? null);
    }
  }, [user]);

  //Passions
  const passions = useMemo(
    () => {
      const sorted = passionData.map((id) => ({
        id,
        name: getText('en', `PASSION.${id}`),
      }));
      sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
      return sorted;
    },
    [
      // todo: language
    ],
  );

  //Skills
  const {data: skillsData, error} = useSWRInfinite<any>(
    '/skills?limit=1000',
    get,
  );
  const skills = useMemo(() => {
    const sorted: {id: string; name: string}[] = [];
    skillsData?.items?.forEach((skill: any) => {
      const name = getText('en', `SKILL.${skill.name}`);
      if (name) sorted.push({id: skill.name, name});
    });
    sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
    return sorted;
  }, [
    // todo: language
    skillsData,
  ]);

  //FORM-HOOKS
  const formMethods = useForm({
    resolver: joiResolver(schemaProfileUpdate),
    defaultValues: {
      firstName: user?.first_name ?? '',
      lastName: user?.last_name ?? '',
      userName: user?.username ?? '',
      // email: user?.email,
      bio: user?.bio,
      mission: user?.mission,
      passions: user?.social_causes ?? [],
      skills: user?.skills ?? [],
      country: user?.country,
      city: user?.city,
      address: user?.address,
      countryNumber: user?.mobile_country_code,
      phoneNumber: user?.phone,
    },
  });

  // When doesn't want to save.
  const onForceClose = useCallback(() => {
    setEditState('MAIN');
    formMethods.reset();
    closeModal();
  }, [closeModal, formMethods]);

  // Left arrow onClick
  const goBack = useCallback(
    () => (editState === 'MAIN' ? onForceClose() : setEditState('MAIN')),
    [editState, onForceClose],
  );

  const onSubmit = useCallback(async () => {
    //CHECKING IMAGE UPLOAD
    // TODO: Check if size exceeds limit. Better to wait for UI.( try/catch )
    let avatarId: string | null = await checkAndUploadMedia(avatar);
    let coverId: string | null = await checkAndUploadMedia(coverImage);

    //fetching values from Form
    const first_name: string = formMethods.getValues('firstName');
    const last_name: string = formMethods.getValues('lastName');
    const username: string = formMethods.getValues('userName');
    // const email: string = formMethods.getValues('email');
    const bio: string = formMethods.getValues('bio').trim();
    const mission: string = formMethods.getValues('mission').trim();
    const social_causes: string[] = formMethods.getValues('passions');
    const skills: string[] = formMethods.getValues('skills');
    const country: string = formMethods.getValues('country');
    const city: string = formMethods.getValues('city');
    const address: string = formMethods.getValues('address')?.trim();
    const mobile_country_code: string = formMethods.getValues('countryNumber');
    const phone: string = formMethods.getValues('phoneNumber');

    // Creating Profile Body
    const updateProfileBody: UpdateProfileBodyType = {
      first_name,
      last_name,
      username,
      // email,
      bio,
      social_causes,
      skills,
      country,
      city,
    };
    if (address) updateProfileBody.address = address;
    if (mobile_country_code)
      updateProfileBody.mobile_country_code = mobile_country_code;
    if (phone) updateProfileBody.phone = phone;
    if (avatarId) updateProfileBody.avatar = avatarId;
    if (coverId) updateProfileBody.cover_image = coverId;
    if (mission) updateProfileBody.mission = mission;

    //Making a API call
    try {
      console.log('I am making request');
      const response: any = await updateProfile(updateProfileBody);
      console.log('Got the response :---: ', response);
      mutateUser(response);
      user?.username === response.username
        ? mutate(`/user/by-username/${user?.username}/profile`)
        : Router.push(`/app/user/${response.username}`);
      closeModal();
      forceUpdate();
    } catch (error) {
      console.log('ERROR :---: ', error);
    }
  }, [avatar, closeModal, coverImage, formMethods, mutateUser, user?.username]);

  return (
    <Modal
      isOpen={openState}
      onClose={onForceClose}
      className={twMerge(
        '-m-4 flex w-screen max-w-2xl flex-col rounded-none p-0 pt-14 sm:m-0 sm:max-h-[45rem] sm:w-full sm:max-w-md sm:rounded-2xl sm:pt-0',
        editState !== 'MAIN' && 'h-screen',
      )}
    >
      <div className="sticky top-0">
        <Modal.Title>
          <h3 className="font-worksans border-b-2 pt-6 pb-2 text-center text-xl font-semibold">
            {editState === 'MAIN' && 'Edit profile'}
            {editState === 'SKILLS' && 'Skills'}
            {editState === 'CAUSES' && 'Social causes'}
          </h3>
        </Modal.Title>
        {/* Arrow Button */}
        <span
          className={twMerge(
            'absolute top-6 left-3',
            editState === 'MAIN' && 'sm:hidden',
          )}
          onClick={goBack}
        >
          <ChevronLeftIcon className="w-6" />
        </span>
        {/* Cross */}
        {editState === 'MAIN' && (
          <>
            <span
              className="absolute top-6 right-3 hidden cursor-pointer sm:block"
              onClick={() => onForceClose()}
            >
              <XMarkIcon className="w-6" />
            </span>

            <span
              className="absolute top-6 right-3 cursor-pointer text-base text-primary sm:hidden"
              onClick={() => closeModal()}
            >
              Save
            </span>
          </>
        )}
      </div>
      <FormProvider {...formMethods}>
        {editState === 'MAIN' && (
          <EditMainMenu
            goTo={(data: 'SKILLS' | 'CAUSES') => setEditState(data)}
            editProfile={onSubmit}
            setNewCover={setCoverImage}
            setNewAvatar={setAvatar}
            coverImage={user?.cover_image?.url ?? null}
            avatar={user?.avatar?.url ?? null}
          />
        )}
        {editState === 'CAUSES' && (
          <EditSubMenu
            items={passions}
            formField="passions"
            maxSize={5}
            customText="Popular"
          />
        )}
        {editState === 'SKILLS' && (
          <EditSubMenu
            items={skills}
            formField="skills"
            maxSize={10}
            customText="Accounting & Consultancy"
          />
        )}
      </FormProvider>
      {/* {editState === 'SKILLS' && <EditSkillsModal />} */}
    </Modal>
  );
};

export default EditProfileModal;
