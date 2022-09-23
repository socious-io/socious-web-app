import ApplicantsContent from '@components/common/Project/created/ApplicantsContent';

import SideBar from '@components/common/Project/SideBar/SideBar';

const Applicant = () => {
  return (
    <div className=" mt-10 flex md:space-x-6">
      <SideBar selectBar={'APPLICANT'} />
      <ApplicantsContent />
    </div>
  );
};

export default Applicant;
