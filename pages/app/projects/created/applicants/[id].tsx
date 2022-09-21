import ApplicantsContent from '@components/common/Project/created/ApplicantsContent';
import DetailContent from '@components/common/Project/created/DetailContent';
import SideBar from '@components/common/Project/SideBar/SideBar';

const Applicant = () => {
  return (
    <div className=" mx-6 mt-10 flex md:space-x-6">
      <SideBar selectBar={'PROJECT_DETAIL'} />
      <ApplicantsContent />
    </div>
  );
};

export default Applicant;
