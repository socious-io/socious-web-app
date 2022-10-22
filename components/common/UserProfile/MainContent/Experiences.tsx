import {Experience} from '@components/common/Experience/Experience';
import {Experience as Props} from '@models/workExperience';
import Title from './Title';

export const Experiences = ({list}: {list: Props[]}): JSX.Element => {
  const experienceList = list.map((organization) => (
    <div key={organization.id} className="mb-4">
      <Experience {...organization} />
    </div>
  ));

  return (
    <div className="border-t border-grayLineBased p-4">
      <Title>Experiences</Title>
      {experienceList}
    </div>
  );
};
