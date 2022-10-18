import {FC} from 'react';
import {Button} from '@components/common';
import {useProjectContext} from '../context';
import {TOnSubmit} from '../sharedType';
import {FromLayout} from '../Layout';
import {getText} from '@socious/data';
import Chip from 'components/common/UserProfile/MainContent/Chip';
import ProjectInfoOverview from './ProjectInfoOverview';

const ProjectPreview: FC<TOnSubmit> = ({onSubmit}) => {
  const {ProjectContext} = useProjectContext();

  return (
    <form className="flex h-full w-full flex-col">
      <FromLayout>
        <div className="mx-4 overflow-y-scroll">
          <h2 className="mb-5">Project description</h2>
          <ProjectInfoOverview project={ProjectContext} />
          <div className="flex flex-col">
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
            {ProjectContext?.skills?.length > 0 && (
              <div className="mb-6 flex flex-col ">
                <span className="mb-2 text-base font-normal text-primary">
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
          </div>
        </div>
      </FromLayout>
      <div className=" flex items-end justify-end border-t p-4">
        <Button
          type="button"
          onClick={() => onSubmit('ACTIVE')}
          className="'flex h-11 w-36 items-center justify-center"
        >
          Create
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => onSubmit('DRAFT')}
          className="ml-2 flex h-11 w-36 items-center justify-center"
        >
          Save draft
        </Button>
      </div>
    </form>
  );
};

export default ProjectPreview;
