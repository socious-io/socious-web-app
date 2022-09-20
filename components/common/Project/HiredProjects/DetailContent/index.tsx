import HeaderBoxContainer from 'layout/HeaderBoxContainer/HeaderBoxContainer';
import BodyCard from '../../component/BodyCard';
import FeedbackCard from '../../component/FeedbackCard';
import MyApplicationsCard from '../../component/MyApplicationsCard';

import OfferCard from '../../component/OfferCard';
import ProjectInfoCard from '../../component/ProjectInfoCard';

const Detail = () => {
  return (
    <div className="mb-10 w-full ">
      <div className="divide-y  ">
        <FeedbackCard />
        <OfferCard />
        <ProjectInfoCard />
        <MyApplicationsCard />
      </div>
    </div>
  );
};

export default Detail;
