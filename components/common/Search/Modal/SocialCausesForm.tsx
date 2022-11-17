import Button from '@components/common/Button/Button';
import SocialCauses from '@components/common/CreateOrganization/steps/SocialCauses';
import {FormLayout} from '@components/common/Project/created/NewProject/Layout';
import {useRouter} from 'next/router';
import {FC} from 'react';
import {useForm, FieldValues, FormProvider} from 'react-hook-form';

interface SocialCausesFormProps {
  onSubmit?: (data: FieldValues) => void;
}

export const SocialCausesForm: FC<SocialCausesFormProps> = ({onSubmit}) => {
  const route = useRouter();
  const methods = useForm();

  const onsubmit = (data: FieldValues) => {
    if (data.social_causes.length) {
      route.query.social_causes = data.social_causes.join(',');
      route.push(route);
    }
    onSubmit?.(data);
  };

  return (
    <FormProvider {...methods}>
      <FormLayout>
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
      </FormLayout>
    </FormProvider>
  );
};
