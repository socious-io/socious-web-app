import {FC} from 'react';
import {useFormContext} from 'react-hook-form';

type TPreviewItem = {
  label: string;
  text?: string;
};

export const PreviewItem: FC<TPreviewItem> = ({label, text}) => {
  return (
    <div className="flex w-full flex-row bg-slate-700">
      <span className="cursor-pointer text-sm">{label}</span>
      <span>{text}</span>
    </div>
  );
};

const ProjectPreview = () => {
  const formMethods = useFormContext();
  const {getValues} = formMethods;
  console.log('*********');
  console.log(getValues());
  console.log('*********');

  // console.log(getValues('title'));

  return (
    <div className="flex h-full w-full flex-col py-6 px-4">
      <h2>Project description</h2>
      <PreviewItem label="Project Title" text={getValues('title')} />
    </div>
  );
};

export default ProjectPreview;
