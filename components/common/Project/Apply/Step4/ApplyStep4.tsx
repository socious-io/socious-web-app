import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import TextArea from '@components/common/TextArea/TextArea';
import Button from '@components/common/Button/Button';
import {FromLayout} from '../../created/NewProject/Layout';
import {useProjectContext} from '../../created/NewProject/context';
import {joiResolver} from '@hookform/resolvers/joi';
import {schemaLink} from '@api/projects/validation';
import TextInput from '@components/common/TextInput/TextInput';

const AddLink = () => {
  const {
    formState: {errors, isValid},
    setValue,
  } = useForm({
    resolver: joiResolver(schemaLink),
  });
  const {ProjectContext, setProjectContext} = useProjectContext();
  const [name, setName] = useState<string>(' ');
  const [link, setLink] = useState<string>(' ');

  useEffect(() => {
    if (ProjectContext?.cv_name) {
      setValue('cv_name', ProjectContext.cv_name, {
        shouldValidate: true,
      });
      setName(ProjectContext.cv_name);
    }
    if (ProjectContext?.cv_link) {
      setValue('cv_link', ProjectContext.cv_link, {
        shouldValidate: true,
      });
      setLink(ProjectContext.cv_link);
    }
  }, [ProjectContext.cv_link, ProjectContext.cv_name, setValue]);

  return (
    <div className="flex h-full w-full flex-col">
      <FromLayout type="FULL">
        <div className="mt-2 flex h-full flex-col space-y-4 px-4">
          <div className="mt-2 space-y-4 pl-0 ">
            <TextInput
              required
              label="Link name "
              placeholder="Link name"
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
            <TextInput
              required
              label="Link URL"
              placeholder="Link url"
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
      <div className="flex items-end justify-center border-t p-4 px-4 pb-12 sm:justify-end sm:pb-4">
        <Button
          type="button"
          variant="fill"
          className="flex w-full justify-center sm:w-36"
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
          <div className="text-base font-semibold">Add a link</div>
        </Button>
      </div>
    </div>
  );
};

export default AddLink;
