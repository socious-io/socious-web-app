import Button from '@components/common/Button/Button';
import SocialCauses from '@components/common/CreateOrganization/steps/SocialCauses';
import Modal from '@components/common/Modal/Modal';
import {FromLayout} from '@components/common/Project/created/NewProject/Layout';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {useRouter} from 'next/router';
import {FC, useEffect} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';

interface SocialCausesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialCausesModal: FC<SocialCausesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const route = useRouter();
  const methods = useForm();
  const {social_causes} = route.query;

  useEffect(() => {
    if (social_causes)
      methods.setValue('social_causes', (social_causes as string)?.split(','));
    else methods.setValue('social_causes', null);
  }, [methods, route.query, social_causes]);

  const onsubmit = (data: FieldValues) => {
    route.query.social_causes = data.social_causes.join(',');
    route.push(route);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="-m-4 h-screen w-screen rounded-none p-0 sm:m-0 sm:h-auto sm:rounded-2xl"
    >
      <div className="p-3">
        <span className="absolute right-3 cursor-pointer " onClick={onClose}>
          <XMarkIcon className="w-6" />
        </span>
      </div>
      <Modal.Title>
        <p className="min-h-[30px] text-center text-xl">Social Causes</p>
      </Modal.Title>
      <Modal.Description>
        <FormProvider {...methods}>
          <FromLayout>
            <SocialCauses
              onSubmit={methods.handleSubmit(onsubmit)}
              showTitle={false}
              renderButton={() => (
                <footer className="flex w-full justify-end border-t border-grayLineBased p-4">
                  <Button type="submit" className="px-10 py-1.5 font-medium">
                    Confirm
                  </Button>
                </footer>
              )}
            />
          </FromLayout>
        </FormProvider>
      </Modal.Description>
    </Modal>
  );
};
