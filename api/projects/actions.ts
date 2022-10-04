import {CreateProjectType} from '@models/project';
import {post, get} from 'utils/request';

export function createProject(projectBody: CreateProjectType) {
  console.log('********');
  console.log(projectBody);
  console.log('********');

  return post(`/projects`, projectBody);
}

export function updateProjectById(
  projectId: string,
  projectBody: CreateProjectType,
) {
  return post(`projects/update/${projectId}`, projectBody);
}
