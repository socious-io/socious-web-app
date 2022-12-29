import {post} from 'utils/request';

export function completeAssignment(missionId: string) {
  return post(`/missions/${missionId}/complete`, {});
}

export function confirmWork(missionId: string) {
  return post(`/missions/${missionId}/confirm`, {});
}

export function stopAssignment(missionId: string) {
  return post(`/missions/${missionId}/cancel`);
}
