import SideBar from '@components/common/Project/SideBar/SideBar';
import {DetailLayout, GeneralLayout} from 'layout';
import {NextPage} from 'next';
import {Achievements} from 'src/design-system/pages/achievements/achievements';

const ImpactPoint: NextPage = () => {
  return (
    // <GeneralLayout style={{marginTop: '56px'}}>
    // </GeneralLayout>

    <GeneralLayout>
      <div
        style={{
          paddingTop: 47,
          paddingBottom: 140,
          minWidth: '100%',
        }}
      >
        <Achievements />
      </div>
    </GeneralLayout>
  );
};

export default ImpactPoint;
