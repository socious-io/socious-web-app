import Button from '@components/common/Button/Button';
import {useToggle, useUser} from '@hooks';
import HiredCard from '../../component/HiredCard';

var data = [
  {
    id: 1,
    projectId: '1',
  },
  {
    id: 2,
    projectId: '2',
  },
  {
    id: 3,
    projectId: '3',
  },
];
var data2 = [
  {
    id: 1,
    projectId: '1',
  },
  {
    id: 2,
    projectId: '2',
  },
  {
    id: 3,
    projectId: '3',
  },
];
var data3 = [
  {
    id: 1,
    projectId: '1',
  },
  {
    id: 2,
    projectId: '2',
  },
  {
    id: 3,
    projectId: '3',
  },
];
function MyApplicationBoxes() {
  const {user} = useUser();
  return (
    <div className="w-full pb-4 ">
      <HiredCard hasButtons={true} />
      <div className=" divide-y rounded-2xl border border-grayLineBased bg-white ">
        <div className=" divide-y p-4 ">
          <p className="py-4 font-semibold text-black">Cover Letter</p>
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
              <div key={e.id} className="my-4 flex flex-col">
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
    </div>
  );
}

export default MyApplicationBoxes;
