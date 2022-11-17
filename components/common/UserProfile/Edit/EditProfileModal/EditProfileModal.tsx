// Packages
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {twMerge} from 'tailwind-merge';
import {FormProvider, useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';

// Components
import {Modal} from '@components/common';
import EditSubMenu from '../EditSubMenu/EditSubMenu';
import EditMainMenu from '../EditMainMenu/EditMainMenu';

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
import {
  IUpdateUserBody,
  IUpdateOrgBody,
  IUpdateProfileBody,
} from '@models/profile';
import {mutate} from 'swr';
import Router from 'next/router';
import {useUser} from '@hooks';
import {AxiosError} from 'axios';
import {toast} from 'react-toastify';
import {Skill} from '@components/common/Search/Providers/SkillsProvider';
import {updateOrganization} from '@api/organizations/actions';
interface EditProfileModalProps {
  openState: boolean;
  user: any;
  closeModal: () => void;
  skillsData: Skill[];
}

const EditProfileModal = ({
  openState,
  user,
  skillsData,
  closeModal,
}: EditProfileModalProps) => {
  const [_ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [editState, setEditState] = useState<'MAIN' | 'CAUSES' | 'SKILLS'>(
    'MAIN',
  );
  const {currentIdentity} = useUser();

  const {mutateUser} = useUser();
  const [avatar, setAvatar] = useState<any>();
  const [coverImage, setCoverImage] = useState<any>();

  useEffect(() => {
    if (user) {
      setAvatar(() =>
        currentIdentity?.type === 'users' ? user?.avatar?.id : user?.image?.id,
      );
      setCoverImage(user?.cover_image?.id ?? null);
    }
  }, [currentIdentity?.type, user]);

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

  const skills = useMemo(() => {
    const sorted: {id: string; name: string}[] = [];
    skillsData?.forEach((skill: any) => {
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
      userType: currentIdentity?.type,
      // User Only
      firstName: user?.first_name ?? null,
      lastName: user?.last_name ?? null,
      userName: user?.username ?? null,
      skills: user?.skills ?? null,
      // Organization Only
      email: user?.email,
      name: user?.name ?? null,
      type: user?.type ?? null,
      culture: user?.culture ?? null,
      website: user?.website ?? null,
      // Both
      bio: user?.bio,
      mission: user?.mission,
      passions: user?.social_causes ?? [],
      country: user?.country,
      city: user?.city,
      geoname_id: user?.geoname_id ?? null,
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

  const onSubmit = useCallback(
    async (data?: any) => {
      //CHECKING IMAGE UPLOAD
      // TODO: Check if size exceeds limit. Better to wait for UI.( try/catch )
      let avatarId: string | null = await checkAndUploadMedia(avatar);
      let coverId: string | null = await checkAndUploadMedia(coverImage);

      const {
        firstName: first_name,
        lastName: last_name,
        userName: username,
        skills,
        email,
        name,
        type,
        culture,
        website,
        bio,
        mission,
        passions: social_causes,
        country,
        city,
        geoname_id,
        address,
        countryNumber: mobile_country_code,
        phoneNumber: phone,
      } = data;

      // Creating Profile Body
      const updateProfileBody: IUpdateProfileBody = {
        bio,
        social_causes,
        country,
        city,
        geoname_id,
      };
      if (address) updateProfileBody.address = address;
      if (mobile_country_code)
        updateProfileBody.mobile_country_code = mobile_country_code;
      if (phone) updateProfileBody.phone = phone;
      if (coverId) updateProfileBody.cover_image = coverId;
      if (mission) updateProfileBody.mission = mission;

      //Making a API call
      try {
        // Updating USER
        if (currentIdentity?.type === 'users') {
          if (avatarId) updateProfileBody.avatar = avatarId;
          const response = await updateProfile({
            ...updateProfileBody,
            first_name,
            last_name,
            username,
            skills,
          });
          mutateUser(response);
          user?.username === response.username
            ? mutate(`/user/by-username/${user?.username}/profile`)
            : Router.push(`/app/user/${response.username}`);
        } else if (currentIdentity?.id) {
          // Updating ORG
          const updateOrgBody: IUpdateOrgBody = {
            ...updateProfileBody,
            name,
            type,
            email,
          };
          if (culture) updateOrgBody.culture = culture;
          if (website) updateOrgBody.website = website;
          if (avatarId) updateOrgBody.image = avatarId;
          const response = await updateOrganization(user.id, updateOrgBody);
          mutateUser(response);
          user?.shortname === response.shortname
            ? mutate(`/orgs/by-shortname/${user.shortname}`)
            : Router.push(`/app/organization/${response.shortname}`);
        }
        closeModal();
        forceUpdate();
      } catch (error) {
        const data: any = (error as AxiosError).response?.data;
        if (data) {
          if (
            /^duplicate key value violates unique constraint.*phone/.exec(
              data.error,
            )
          ) {
            formMethods.setError(
              'phoneNumber',
              {
                type: 'value',
                message:
                  'This phone number is already associated with another user',
              },
              {shouldFocus: true},
            );
          } else
            toast.error(`Couldn't save data: ${data.error || 'error'}`, {
              autoClose: false,
            });
        }
      }
      // forceUpdate();
    },
    [
      avatar,
      closeModal,
      coverImage,
      currentIdentity?.id,
      currentIdentity?.type,
      formMethods,
      mutateUser,
      user.id,
      user.shortname,
      user?.username,
    ],
  );

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
            avatar={user?.avatar?.url ?? user?.image?.url}
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
