import {FC} from 'react';
import {Button} from '@components/common';
import {useProjectContext} from '../context';
import {TOnSubmit} from '../sharedType';
import {useForm} from 'react-hook-form';
import {FromLayout} from '../Layout';
import {getText} from '@socious/data';
import Chip from 'components/common/UserProfile/MainContent/Chip';

type TPreviewItem = {
  label: string;
  text?: string;
};

export const PreviewItem: FC<TPreviewItem> = ({label, text}) => {
  return (
    <div className="mb-6 flex w-full flex-col ">
      <span className="mb-2 text-base font-normal text-primary">{label}</span>
      <span>{text}</span>
    </div>
  );
};

const ProjectPreview: FC<TOnSubmit> = ({onSubmit}) => {
  const {ProjectContext} = useProjectContext();
  const {handleSubmit} = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col"
    >
      <FromLayout>
        <div className="mx-4 overflow-y-scroll">
          <h2 className="mb-5">Project description</h2>
          <PreviewItem label="Project Title" text={ProjectContext.title} />
          <PreviewItem
            label="Project description"
            text={ProjectContext.description}
          />
          <PreviewItem
            label="Remote Preference"
            text={ProjectContext.remote_preference}
          />
          {ProjectContext.country && (
            <PreviewItem label="Location" text={ProjectContext.country} />
          )}
          <div className="flex flex-row">
            {ProjectContext.project_type && (
              <PreviewItem
                label="Project type"
                text={ProjectContext.project_type}
              />
            )}
            {ProjectContext.project_length && (
              <PreviewItem
                label="Project length"
                text={ProjectContext.project_length}
              />
            )}
          </div>
          <div className="flex flex-row">
            {ProjectContext.payment_type && (
              <PreviewItem
                label="Payment type"
                text={ProjectContext.payment_type}
              />
            )}
            {ProjectContext.payment_scheme && (
              <PreviewItem
                label="Payment rate"
                text={ProjectContext.payment_scheme}
              />
            )}
          </div>
          <div className="flex flex-row">
            {ProjectContext.payment_range_lower && (
              <PreviewItem
                label="Payment range lower"
                text={ProjectContext.payment_range_lower}
              />
            )}
            {ProjectContext.payment_range_higher && (
              <PreviewItem
                label="Payment range higher"
                text={ProjectContext.payment_range_higher}
              />
            )}
            {ProjectContext?.causes_tags?.length > 0 && (
              <div className="mb-6 flex flex-col ">
                <span className="mb-2 text-base font-normal text-primary">
                  Social causes
                </span>
                <div className="flex w-full flex-wrap gap-2 ">
                  {ProjectContext?.causes_tags?.map((item: string) => {
                    return (
                      <Chip
                        key={item}
                        name={getText('en', `PASSION.${item}`) || item}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </FromLayout>
      <div className=" flex items-end justify-end border-t p-4">
        <Button
          type="submit"
          className="'flex h-11 w-36 items-center justify-center"
        >
          Create
        </Button>
        <Button
          variant="outline"
          type="submit"
          className="ml-2 flex h-11 w-36 items-center justify-center"
        >
          Save project
        </Button>
      </div>
    </form>
  );
};

export default ProjectPreview;
