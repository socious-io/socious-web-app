import {post} from 'utils/request';

export function completeAssignment(missionId: string) {
  return post(`/missions/${missionId}/complete`, {});
}

export function confirmWork(missionId: string) {
  return post(`/missions/${missionId}/confirm`, {});
}

// org side
export function stopAssignment(missionId: string) {
  return post(`/missions/${missionId}/kickout`);
}

// user side
export function cancelAssignment(missionId: string) {
  return post(`/missions/${missionId}/cancel`);
}
