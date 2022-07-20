import { Avatar, Chip } from "@components/common";

import { Project } from "models/project";

export function ProjectCard({ title }: Project) {
  return (
    <div className="p-4 space-y-4 rounded-2xl border border-grayLineBased">
      <div className="flex flex-row items-center space-x-2">
        <Avatar size="l" />
        <div className="flex flex-col">
          <p className="text-black">Organization</p>
          <p className="text-graySubtitle">Location</p>
        </div>
      </div>
      <div className="">
        <p className="font-semibold">{title}</p>
      </div>
      <div className="flex flex-row space-x-2 divide-x divide-solid divide-graySubtitle">
        <p className="text-graySubtitle text-sm">Part time</p>
        <p className="text-graySubtitle text-sm pl-2">Volunteer</p>
        <p className="text-graySubtitle text-sm pl-2">Expert</p>
      </div>
      <div>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Equat
          faucibus sed facilisi sit id blandiacilisi sit id blandit
        </p>
      </div>
      <div className="flex flex-row space-x-2">
        <Chip content="Passion" contentClassName="text-secondary" />
        <Chip content="Passion" contentClassName="text-secondary" />
        <Chip content="Passion" contentClassName="text-secondary" />
      </div>
      <div>
        <p className="text-sm text-graySubtitle">Time</p>
      </div>
    </div>
  );
}

export default ProjectCard;
