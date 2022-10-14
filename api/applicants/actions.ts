import {TOfferApplicant} from '@models/applicant';
import {post} from 'utils/request';

export function offerApplicant(
  applicantId: string,
  offerBody: Omit<TOfferApplicant, 'offer_rate'>,
) {
  return post(`/applicants/${applicantId}/offer`, offerBody);
}
