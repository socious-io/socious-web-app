import {
  CreateProjectType,
  ApplyProjectType,
  AddQuestionType,
  Project,
} from '@models/project';
import {Question} from '@models/question';
import {post} from 'utils/request';

export function createProject(projectBody: CreateProjectType) {
  return post(`/projects`, projectBody);
}

export function updateProjectById(
  projectId: string,
  projectBody: CreateProjectType,
) {
  return post<Project>(`/projects/update/${projectId}`, projectBody);
}

export function applyProject(projectId: string, projectBody: ApplyProjectType) {
  return post(`/projects/${projectId}/applicants`, projectBody);
}

export function addQuestion(projectId: string, questionBody: AddQuestionType) {
  return post<Question>(`/projects/${projectId}/questions`, questionBody);
}

export function updateQuestion(
  projectId: string,
  questionId: string,
  questionBody: AddQuestionType,
) {
  return post<Question>(
    `/projects/update/${projectId}/questions/${questionId}`,
    questionBody,
  );
}
