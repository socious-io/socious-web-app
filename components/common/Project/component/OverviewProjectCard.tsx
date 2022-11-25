import Image from 'next/image';
import Title from '@components/common/UserProfile/MainContent/Title';
import {FC} from 'react';
const editSrc = require('../../../../asset/icons/edit.svg');
import {ProjectProps} from 'models/project';
import ProjectInfoOverview from '../created/NewProject/ProjectReview/ProjectInfoOverview';
interface TInput extends ProjectProps {
  onclick?: () => void;
}
const OverviewProjectCard: FC<TInput> = ({project, onclick}) => {
  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-row items-center justify-between ">
        <Title>Project details</Title>
        {onclick && (
          <div className="relative  h-5 w-5 ">
            <div className="cursor-pointer" onClick={onclick}>
              <Image
                src={editSrc}
                className="fill-warning"
                alt="dislike"
                layout="fill"
              />
            </div>
          </div>
        )}
      </div>
      <ProjectInfoOverview project={project} />
    </div>
  );
};

export default OverviewProjectCard;
