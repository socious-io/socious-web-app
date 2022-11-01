import {FC} from 'react';
import {getText} from '@socious/data';
import {useFormattedLocation} from 'services/formatLocation';
import {EXPERIENCE_LEVEL_OPTIONS} from '@components/common/Search/filterOptions';
import Markdown from 'markdown-to-jsx';
import Project from 'pages/app/feed';

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
    experience_level: number;
  };
};
type TPreviewItem = {
  label: string;
  text?: string | number | JSX.Element;
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

  const description = (
    <Markdown options={{wrapper: 'article'}}>{project.description}</Markdown>
  );

  return (
    <>
      <PreviewItem label="Project Title" text={project.title} />
      <PreviewItem label="Project description" text={description} />

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
        {project.payment_type === 'PAID' && (
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
        )}
        {project.payment_scheme === 'HOURLY' && (
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
        )}
        {project.payment_currency && (
          <PreviewItem
            label="Payment currency"
            text={project.payment_currency}
          />
        )}
        {project.experience_level !== null && (
          <PreviewItem
            label="Experience level"
            text={
              EXPERIENCE_LEVEL_OPTIONS.find(
                (item, index) => index === project.experience_level,
              )?.label
            }
          />
        )}
      </div>
    </>
  );
};

export default ProjectInfoOverview;
