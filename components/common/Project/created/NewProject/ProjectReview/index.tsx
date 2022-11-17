import {FC} from 'react';
import {Button} from '@components/common';
import {useProjectContext} from '../context';
import {TOnSubmit} from '../sharedType';
import {FormLayout} from '../Layout';
import {getText} from '@socious/data';
import Chip from 'components/common/UserProfile/MainContent/Chip';
import ProjectInfoOverview from './ProjectInfoOverview';
import {QuestionsCard} from '../../DetailContent';
import {useForm} from 'react-hook-form';

const ProjectPreview: FC<TOnSubmit> = ({onSubmit}) => {
  const {ProjectContext} = useProjectContext();
  const {
    handleSubmit,
    formState: {isSubmitting},
  } = useForm();

  return (
    <form className="flex h-full w-full flex-col">
      <FormLayout>
        <div className="overflow-y-scroll">
          <h2 className="mb-5 px-4">Project description</h2>
          <div className="px-4">
            <ProjectInfoOverview project={ProjectContext} />
          </div>
          <div className="flex flex-col divide-y border-t px-4">
            {ProjectContext?.causes_tags?.length > 0 && (
              <div className="mb-6 mt-2 flex flex-col">
                <span className="font-worksans mb-2 text-base font-semibold text-black">
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
            {ProjectContext?.skills?.length > 0 && (
              <div className="mb-6 mt-2 flex flex-col">
                <span className="font-worksans mb-2 text-base font-semibold text-black">
                  Skill
                </span>
                <div className="flex w-full flex-wrap gap-2 ">
                  {ProjectContext?.skills?.map((item: string) => {
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

export default ProjectPreview;
