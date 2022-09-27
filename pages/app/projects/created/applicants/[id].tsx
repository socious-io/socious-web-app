import ApplicantsContent from '@components/common/Project/created/ApplicantsContent';

import SideBar from '@components/common/Project/SideBar/SideBar';
import {GeneralLayout} from 'layout';
const Applicant = () => {
  return (
    <GeneralLayout hasNavbar>
      <SideBar selectBar={'APPLICANT'} />
      <ApplicantsContent />
    </GeneralLayout>
  );
};

export default Applicant;
