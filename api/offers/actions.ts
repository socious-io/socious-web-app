import {} from '@models/applicant';
import {post} from 'utils/request';

export function approve(offerId: string) {
  return post(`/offers/${offerId}/approve`, {});
}

export function hire(offerId: string) {
  return post(`/offers/${offerId}/hire`, {});
}

export function withdrawn(offerId: string) {
  return post(`/offers/${offerId}/withdrawn`, {});
}

export function cancel(offerId: string) {
  return post(`/offers/${offerId}/cancel`, {});
}
