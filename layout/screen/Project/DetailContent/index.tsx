import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import ArraySegmentBox from '@components/common/UserProfile/MainContent/ArraySegmentBox';
import OrganizationTopCard from './OrganizationTopCard';

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
  'Financial Analysis',
];
var disp = `//Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh aliquet
nullam odio maecenas semper. Dui felis suspendisse nunc, in vel enim
nunc adipiscing donec. Pellentesque a magna venenatis ut ut semper
dictum sit sem. Suspendisse lacus, pulvinar elit ipsum fermentum. Ipsum,
orci, faucibus nibh et commodo et, dignissim erat. Adipiscing fusce et
fames aliquam condimentum.`;

const Detail = () => {
  return (
    <div className="mb-10 w-full ">
      <div className="divide-y rounded-2xl border border-grayLineBased bg-white ">
        <OrganizationTopCard
          title={''}
          description={''}
          country_id={0}
          project_type={0}
          project_length={0}
          payment_type={0}
          payment_scheme={0}
          payment_range_lower={''}
          payment_range_higher={''}
          experience_level={0}
        />
        <ArraySegmentBox
          social_causes={social_causes}
          title={'Social causes'}
        />
        <BodyBox title={'Project description'} description={disp} />
        <ArraySegmentBox social_causes={skills} title={'Skills'} />
        <BodyBox title={'About the organization'} description={disp} />
      </div>
    </div>
  );
};

export default Detail;
