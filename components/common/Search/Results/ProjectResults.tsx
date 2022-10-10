import Avatar from '@components/common/Avatar/Avatar';
import {GroupsOfChips} from '@components/common/Project/component/ProjectCard';
import {
  BookmarkIcon,
  ChevronRightIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';
import {FC} from 'react';

interface ProjectResultsProps {
  items: any[];
  onPreviewItem: (id: string) => void;
}

export const ProjectResults: FC<ProjectResultsProps> = ({
  items,
  onPreviewItem,
}) => {
  return (
    <>
      {items.map((project) => (
        <div
          className="cursor-pointer rounded-2xl border border-grayLineBased bg-white p-4"
          key={project.id}
          onClick={() => onPreviewItem(project.id)}
        >
          <div className="space-y-6">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center space-x-2">
                <Avatar
                  size="xl"
                  type={'organizations'}
                  src={project?.avatar || ''}
                />
                <div className="flex flex-col justify-center">
                  <p className="text-black">{project?.identity_meta.name}</p>
                  <p className="text-graySubtitle">location</p>
                </div>
              </div>
              <div className="flex gap-4 text-primary">
                <HandThumbDownIcon className="w-4" />
                <BookmarkIcon className="w-4" />
              </div>
            </div>
            <div className="">
              <p className="mb-3 font-semibold">{project?.title}</p>
              <p className="m-0 text-sm text-graySubtitle">
                Part-time | Volunteer | Intermediate
              </p>
            </div>
            <div className="flex flex-row">
              <p className="text-sm">
                {project.description?.length > 200
                  ? `${project.description?.slice(0, 200)}...`
                  : project.description}
                <span className="text-secondary">
                  {project.description?.length > 200 && ' See more'}
                </span>
              </p>
            </div>
            <div className="flex flex-row justify-between ">
              <div className="hide-scroll-bar whitespace-no-wrap w-7/10 flex  flex-row space-x-2  overflow-auto">
                <GroupsOfChips causes_tags={project.causes_tags?.slice(0, 3)} />
              </div>
              <span className="ml-2 flex flex-row items-center">
                <ChevronRightIcon className="w-6 text-primary" />
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex text-graySubtitle">Post date</div>
              <div className="flex gap-2 text-primary">
                <div className="relative">
                  <Avatar />
                  <Avatar className="absolute left-3" />
                  <Avatar />
                </div>
                <span className="text-secondary">Connections</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
