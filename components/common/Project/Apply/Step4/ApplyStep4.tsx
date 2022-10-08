import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import TextArea from '@components/common/TextArea/TextArea';
import Button from '@components/common/Button/Button';
import useUser from 'hooks/useUser/useUser';
import {FromLayout} from '../../created/NewProject/Layout';
import {useProjectContext} from '../../created/NewProject/context';
import {joiResolver} from '@hookform/resolvers/joi';
import {schemaLink} from '@api/projects/validation';

const AddLink = () => {
  const {user} = useUser();
  const {
    formState: {errors, isValid},
    register,
    setValue,
  } = useForm({
    resolver: joiResolver(schemaLink),
  });
  const {ProjectContext, setProjectContext} = useProjectContext();
  const [name, setName] = useState<string>('');
  const [link, setLink] = useState<string>('');

  useEffect(() => {
    if (ProjectContext) {
      setValue('cv_name', ProjectContext.cv_name, {
        shouldValidate: true,
      });
      setValue('cv_link', ProjectContext.cv_link, {
        shouldValidate: true,
      });
      setName(ProjectContext.cv_name);
      setLink(ProjectContext.cv_link);
    }
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <FromLayout>
        <div className="mt-2 flex h-full flex-col space-y-4 px-4">
          <div className="mt-2 space-y-4 pl-0 ">
            <TextArea
              label="Link name "
              placeholder="Write a message..."
              rows={2}
              value={name}
              containerClassName=""
              className="border-gray border-1  overflow-y-scroll focus:border-none"
              errorMessage={errors?.['cv_name']?.message}
              onChange={(e) => {
                setName(e.target.value);
                setValue('cv_name', e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
          </div>
          <div className="mt-2 space-y-4 pl-0 ">
            <TextArea
              label="Link URL"
              placeholder="Write a message..."
              rows={2}
              value={link}
              containerClassName=""
              className="border-gray border-1  overflow-y-scroll focus:border-none"
              errorMessage={errors?.['cv_link']?.message}
              onChange={(e) => {
                setLink(e.target.value);
                setValue('cv_link', e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
          </div>
        </div>
      </FromLayout>
      <div className=" flex items-end justify-end  border-t p-4 px-4">
        <Button
          type="button"
          variant="fill"
          disabled={!isValid}
          onClick={() =>
            setProjectContext({
              ...ProjectContext,
              cv_link: link,
              cv_name: name,
              formStep: 0,
            })
          }
        >
          Add Link
        </Button>
      </div>
    </div>
  );
};

export default AddLink;
