import {CreateProjectType, ApplyProjectType} from '@models/project';
import {post} from 'utils/request';

export function createProject(projectBody: CreateProjectType) {
  return post(`/projects`, projectBody);
}

export function updateProjectById(
  projectId: string,
  projectBody: CreateProjectType,
) {
  return post(`projects/update/${projectId}`, projectBody);
}

export function applyProject(projectId: string, projectBody: ApplyProjectType) {
  return post(`projects/${projectId}/applicants`, projectBody);
}
