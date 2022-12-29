import {TOfferApplicant} from '@models/applicant';
import {post} from 'utils/request';

export function offerApplicant(
  applicantId: string,
  offerBody: Omit<TOfferApplicant, 'offer_rate'>,
) {
  return post(`/applicants/${applicantId}/offer`, offerBody);
}

export function rejectApplicant(applicantId: string) {
  return post(`/applicants/${applicantId}/reject`, {});
}

export function approveOffer(offerId: string) {
  return post(`/offers/${offerId}/approve`, {});
}

export function hire(offerId: string) {
  return post(`/offers/${offerId}/hire`, {});
}

export function withdrawApplication(applicantId: string) {
  return post(`/offers/${applicantId}/withdrawn`, {});
}
