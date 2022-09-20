import {Avatar} from '@components/common';
var data = [{id: 1}, {id: 2}, {id: 3}];

function MyApplicationsCard() {
  return (
    <div className="m-4  divide-y rounded-2xl border border-grayLineBased bg-white ">
      <div className="flex w-full items-center p-4 ">
        <p className="font-semibold text-black">My application</p>
      </div>
      <div className=" divide-y p-4 ">
        <p className="py-4 font-semibold text-black">Organization</p>
        <div>
          <p className=" flex py-4 font-medium text-gray-900">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Equat
            faucibus sed facilisi sit id blandiacilisi sit id blandit... See
            more
          </p>
          <p className="py-4 font-semibold text-black">Screening questions</p>
        </div>
        <div>
          {data.map((e) => (
            <div className="my-4 flex flex-col">
              <p className="text-black">Question1</p>
              <p className="text-graySubtitle">Question</p>
            </div>
          ))}
          <p className="py-4 font-semibold text-black">Contact Info</p>
        </div>

        <div>
          <p className=" flex py-4 font-medium text-gray-900">
            Your contact information (email, phone & address) will be shared
            with Organization.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyApplicationsCard;
