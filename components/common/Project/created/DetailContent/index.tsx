import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import SocialCauses from '@components/common/UserProfile/MainContent/SocialCauses';
import Title from '@components/common/UserProfile/MainContent/Title';
import Link from 'next/link';
import {Modal, Button} from '@components/common';
import OverviewProjectCard from '../../component/OverviewProjectCard';
import Image from 'next/image';
import {useToggle} from 'hooks';
import AlertCard from '@components/common/AlertCard/AlertCard';
import TopTileBox from '@components/common/TopTileBox/TopTileBox';
import EditProjectModal from '../../component/EditProjectModal';

const editSrc = require('../../../../../asset/icons/edit.svg');
const moreSrc = require('../../../../../asset/icons/more.svg');
const bagSrc = require('../../../../../asset/icons/bag.svg');

var social_causes = [
  'Armed Conflict',
  'Abortion',
  'Biodiversity',
  'Anti-Semitism',
  'Animal Rights',
];
var skills = [
  'Bloomberg Terminal',
  'Investment Banking',
  'Sustainable Finance',
  'Impact Investing',
  'nnnn Analysis',
];

var data = [{id: 1}, {id: 2}, {id: 3}];

const Detail = () => {
  const {state: closeProject, handlers: closeProjectHandlers} = useToggle();
  const {state: avoidClose, handlers: avoidCloseHandlers} = useToggle();
  return (
    <div className="mb-10 w-full ">
      <TopTileBox
        title={'Project was closed on 12 Dec'}
        titleClassname={'text-white'}
        backColor={'bg-error'}
        iconSrc={bagSrc}
      />
      <div className="divide-y rounded-2xl border border-grayLineBased bg-white ">
        <div className="flex flex-row items-center justify-between px-4 ">
          <Title>Project Title</Title>
          <div className="relative  h-5 w-5 ">
            <span onClick={closeProjectHandlers.on}>
              <a>
                <Image
                  src={moreSrc}
                  className="fill-warning"
                  alt="dislike"
                  layout="fill" // required
                />
              </a>
            </span>
          </div>
        </div>
        <OverviewProjectCard />
        <SocialCauses social_causes={social_causes} />
        <SocialCauses social_causes={skills} />
        <div className="p-4">
          <div className="flex flex-row items-center justify-between ">
            <Title>Screen review</Title>
            <div className="relative  h-5 w-5 ">
              <Link href="/">
                <a>
                  <Image
                    src={editSrc}
                    className="fill-warning"
                    alt="dislike"
                    layout="fill" // required
                  />
                </a>
              </Link>
            </div>
          </div>
          {data.map((e) => (
            <div key={e.id} className="my-4 flex flex-col">
              <p className="text-black">Question1</p>
              <p className="text-graySubtitle">Question</p>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={closeProject} onClose={closeProjectHandlers.off}>
        <EditProjectModal onSubmit={() => {}} />
        <Modal.CloseButton />
      </Modal>
      {/* <Modal isOpen={closeProject} onClose={closeProjectHandlers.off}>
        <AlertCard
          close={closeProjectHandlers.off}
          accept={closeProjectHandlers.off}
          title={'Close project'}
          description={
            'Are you sure you want to close this project? It will be archived.'
          }
          buttonTitleAccept={'Close project'}
          buttonTitleCancel={'Cancel'}
          isOpen={false}
          titleColor={'text-error'}
        />
      </Modal> */}
      <Modal isOpen={avoidClose} onClose={avoidCloseHandlers.off}>
        <AlertCard
          title={''}
          description={
            'You can not close projects while theer are still on-going assignements. Please end all assignememts before closing the project.'
          }
          buttonTitleAccept={'Back'}
          buttonTitleCancel={''}
          isOpen={false}
          titleColor={'text-error'}
          close={avoidCloseHandlers.off}
        />
      </Modal>
    </div>
  );
};

export default Detail;
