import {Project} from 'models/project';
import Image from 'next/image';
import Title from '@components/common/UserProfile/MainContent/Title';
import {PreviewItem} from 'components/common/Project/created/NewProject/ProjectReview';
import {getText} from '@socious/data';
import {Question} from '@models/question';

const editSrc = require('../../../../asset/icons/edit.svg');
interface TInput {
  title: string;
  description: string;
  country_id: number;
  project_type: string;
  project_length: string;
  payment_type: string;
  payment_scheme: string;
  payment_range_lower: string;
  payment_range_higher: string;
  experience_level: number;
  payment_currency?: string;
  remote_preference: string;
  status: string;
  onclick: () => void;
}
function OverviewProjectCard({
  title,
  country_id,
  project_type,
  payment_range_higher,
  payment_range_lower,
  remote_preference,
  project_length,
  experience_level,
  payment_type,
  description,
  payment_scheme,
  onclick,
}: TInput) {
  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-row items-center justify-between ">
        <Title>{title}</Title>
        <div className="relative  h-5 w-5 ">
          <div className="cursor-pointer" onClick={onclick}>
            <Image
              src={editSrc}
              className="fill-warning"
              alt="dislike"
              layout="fill"
            />
          </div>
        </div>
      </div>

      <PreviewItem label="Project Title" text={title} />
      <PreviewItem label="Project Description" text={description} />
      <div className="flex flex-row">
        <PreviewItem
          label="Remote Preference"
          text={getText('en', `PROJECT.${remote_preference}`)}
        />
        {country_id && (
          <PreviewItem label="Location" text={String(country_id)} />
        )}
      </div>
      <div className="flex flex-row">
        {project_type && (
          <PreviewItem
            label="Project type"
            text={getText('en', `PROJECT.${project_type}`)}
          />
        )}
        {project_length && (
          <PreviewItem
            label="Project length"
            text={getText('en', `PROJECT.${project_length}`)}
          />
        )}
      </div>
      <div className="flex flex-row">
        {payment_type && (
          <PreviewItem
            label="Payment type"
            text={getText('en', `PAYMENT.${payment_type}`)}
          />
        )}
        {payment_scheme && (
          <PreviewItem
            label="Payment rate"
            text={getText('en', `PAYMENT.${payment_scheme}`)}
          />
        )}
      </div>
      <div className="flex flex-col">
        {payment_range_lower && (
          <PreviewItem label="Payment range lower" text={payment_range_lower} />
        )}
        {payment_range_higher && (
          <PreviewItem
            label="Payment range higher"
            text={payment_range_higher}
          />
        )}
      </div>
    </div>
  );
}

export default OverviewProjectCard;
