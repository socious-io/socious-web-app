import {
  CreateProjectType,
  ApplyProjectType,
  AddQuestionType,
} from '@models/project';
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

export function addQuestion(projectId: string, questionBody: AddQuestionType) {
  return post(`/projects/${projectId}/questions`, questionBody);
}
