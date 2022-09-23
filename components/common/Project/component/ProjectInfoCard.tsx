import {Avatar} from '@components/common';

function ProjectInfoCard() {
  return (
    <div className="m-4  divide-y rounded-2xl border border-grayLineBased bg-white ">
      <div className="flex w-full items-center p-4 ">
        <p className="font-semibold text-black">Project Info</p>
      </div>
      <div className=" p-4 ">
        <p className="py-2 font-semibold text-graySubtitle">Date</p>
        <div className="flex flex-row items-center space-x-2">
          <Avatar size="l" />
          <p className="font-semibold text-black">Organization</p>
        </div>
        <div className="mt-4  flex justify-between p-4">
          <dt className=" flex font-medium text-gray-900">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Equat
            faucibus sed facilisi sit id blandiacilisi sit id blandit... See
            more
          </dt>
        </div>
      </div>
    </div>
  );
}

export default ProjectInfoCard;
