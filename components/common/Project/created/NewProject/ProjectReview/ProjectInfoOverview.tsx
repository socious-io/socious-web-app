import {FC} from 'react';
import {getText} from '@socious/data';
import {useFormattedLocation} from 'services/formatLocation';

type TProject = {
  project: {
    title: string;
    description: string;
    remote_preference: string;
    country: string;
    project_type: string;
    project_length: string;
    payment_type: string;
    payment_scheme: string;
    payment_range_lower: string;
    payment_range_higher: string;
    commitment_hours_lower: string;
    commitment_hours_higher: string;
    payment_currency?: string;
    city: string;
  };
};
type TPreviewItem = {
  label: string;
  text?: string | number;
};

export const PreviewItem: FC<TPreviewItem> = ({label, text}) => {
  return (
    <div className="mb-6 flex w-full flex-col ">
      <span className="mb-2 text-base font-normal text-primary">{label}</span>
      <span>{text}</span>
    </div>
  );
};

const ProjectInfoOverview: FC<TProject> = ({project}) => {
  const location = useFormattedLocation(project);

  return (
    <>
      <PreviewItem label="Project Title" text={project.title} />
      <PreviewItem label="Project description" text={project.description} />

      <div className="flex flex-row">
        <PreviewItem
          label="Remote Preference"
          text={getText('en', `PROJECT.${project.remote_preference}`)}
        />
        {project.country && <PreviewItem label="Location" text={location} />}
      </div>
      <div className="flex flex-row">
        {project.project_type && (
          <PreviewItem
            label="Project type"
            text={getText('en', `PROJECT.${project.project_type}`)}
          />
        )}
        {project.project_length && (
          <PreviewItem
            label="Project length"
            text={getText('en', `PROJECT.${project.project_length}`)}
          />
        )}
      </div>
      <div className="flex flex-row">
        {project.payment_type && (
          <PreviewItem
            label="Payment type"
            text={getText('en', `PAYMENT.${project.payment_type}`)}
          />
        )}
        {project.payment_scheme && (
          <PreviewItem
            label="Payment rate"
            text={getText('en', `PAYMENT.${project.payment_scheme}`)}
          />
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          {project.payment_range_lower && (
            <PreviewItem
              label="Payment range lower"
              text={project.payment_range_lower}
            />
          )}
          {project.payment_range_higher && (
            <PreviewItem
              label="Payment range higher"
              text={project.payment_range_higher}
            />
          )}
        </div>
        <div className="flex flex-row">
          {project.commitment_hours_lower && (
            <PreviewItem
              label="Commitment range lower"
              text={project.commitment_hours_lower}
            />
          )}
          {project.commitment_hours_higher && (
            <PreviewItem
              label="Commitment range higher"
              text={project.commitment_hours_higher}
            />
          )}
        </div>
        {project.payment_currency && (
          <PreviewItem
            label="Payment currency"
            text={project.payment_currency}
          />
        )}
      </div>
    </>
  );
};

export default ProjectInfoOverview;