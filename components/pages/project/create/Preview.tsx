import {FC} from 'react';
import {Button} from '@components/common';
import {FormLayout} from '@components/common/Project/created/NewProject/Layout';
import {getText} from '@socious/data';
import Chip from 'components/common/UserProfile/MainContent/Chip';
import {QuestionsCard} from '@components/common/Project/created/DetailContent';
import {useForm} from 'react-hook-form';
import Markdown from 'markdown-to-jsx';
import {CreateProjectType} from '@models/project';
import {useFormattedLocation} from 'services/formatLocation';
import {EXPERIENCE_LEVEL_OPTIONS} from '@components/common/Search/filterOptions';
import {useProjectContext} from '@components/common/Project/created/NewProject/context';

type TOnSubmit = {
  getProject: (s: 'DRAFT' | 'EXPIRE' | 'ACTIVE') => CreateProjectType;
  onSubmit: (s?: 'DRAFT' | 'EXPIRE' | 'ACTIVE') => void;
  jobCategories: any[];
};

export const Preview: FC<TOnSubmit> = ({
  onSubmit,
  getProject,
  jobCategories,
}) => {
  const {
    handleSubmit,
    formState: {isSubmitting},
  } = useForm();

  // for questions only, TODO remove
  const {ProjectContext} = useProjectContext();
  const project = getProject('DRAFT');
  const location = useFormattedLocation(project);

  return (
    <form className="flex h-full w-full flex-col">
      <FormLayout>
        <div className="overflow-y-scroll">
          <h2 className="mb-5 px-4">Project description</h2>
          <div className="px-4">
            <>
              <PreviewItem label="Project Title" text={project.title} />
              <PreviewItem
                label="Project description"
                text={
                  <Markdown options={{wrapper: 'article'}}>
                    {project.description}
                  </Markdown>
                }
              />

              <div className="flex flex-row">
                <PreviewItem
                  label="Remote Preference"
                  text={getText('en', `PROJECT.${project.remote_preference}`)}
                />
                {project.country && (
                  <PreviewItem label="Location" text={location} />
                )}
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
                {project.job_category_id && (
                  <PreviewItem
                    label="Job Category"
                    text={
                      jobCategories.find(
                        (item) => item.id === project.job_category_id,
                      )?.name
                    }
                  />
                )}
              </div>
            </>
          </div>
          <div className="flex flex-col divide-y border-t px-4">
            {project.causes_tags?.length > 0 && (
              <div className="mb-6 mt-2 flex flex-col">
                <span className="font-worksans mb-2 text-base font-semibold text-black">
                  Social causes
                </span>
                <div className="flex w-full flex-wrap gap-2 ">
                  {project.causes_tags?.map((item: string) => {
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
            {project.skills?.length > 0 && (
              <div className="mb-6 mt-2 flex flex-col">
                <span className="font-worksans mb-2 text-base font-semibold text-black">
                  Skill
                </span>
                <div className="flex w-full flex-wrap gap-2 ">
                  {project.skills?.map((item: string) => {
                    return (
                      <Chip
                        key={item}
                        name={getText('en', `SKILL.${item}`) || item}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {ProjectContext.newQuestions?.length && (
              <div className="-mx-4 px-4">
                <QuestionsCard
                  questions={ProjectContext.newQuestions}
                  className="space-y-2 p-0"
                />
              </div>
            )}
          </div>
        </div>
      </FormLayout>
      <div className=" flex items-end justify-end border-t p-4">
        <Button
          type="button"
          onClick={handleSubmit(() => onSubmit('ACTIVE'))}
          className="'flex h-11 w-36 items-center justify-center"
          disabled={isSubmitting}
        >
          Create
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={handleSubmit(() => onSubmit('DRAFT'))}
          className="ml-2 flex h-11 w-36 items-center justify-center"
          disabled={isSubmitting}
        >
          Save draft
        </Button>
      </div>
    </form>
  );
};

type TPreviewItem = {
  label: string;
  text?: string | number | JSX.Element;
};

const PreviewItem: FC<TPreviewItem> = ({label, text}) => {
  return (
    <div className="mb-6 flex w-full flex-col ">
      <span className="mb-2 text-base font-normal text-primary">{label}</span>
      <span>{text}</span>
    </div>
  );
};
