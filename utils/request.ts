import axios from 'axios';

export type AxiosRequestHeaders = {
  [x: string]: string | number | boolean;
};

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true,
  timeout: 40000,
  headers: {
    'content-type': 'application/json',
  },
});

export async function get<T>(url: string) {
  console.log(`get ${url}`);
  const response = await request.get<T>(url);
  return response.data;
}

export async function deleteRequest<T>(
  url: string,
  headers?: AxiosRequestHeaders,
) {
  const response = await request.delete<T>(url, headers);
  return response.data;
}

export async function post<T>(
  url: string,
  data: any = {},
  headers?: AxiosRequestHeaders,
) {
  const response = await request.post<T>(url, data, headers);
  return response.data;
}

export async function patch<T>(
  url: string,
  data: any,
  headers?: AxiosRequestHeaders,
) {
  const response = await request.patch<T>(url, data, headers);
  return response.data;
}

export async function put<T>(
  url: string,
  data: any,
  headers?: AxiosRequestHeaders,
) {
  const response = await request.put<T>(url, data, headers);
  return response.data;
}

export const all = axios.all;

export type ErrorMessage = {
  title: string;
  message: string;
};

export const DefaultErrorMessage: ErrorMessage = {
  title: 'Sorry, something went wrong',
  message:
    'An unexpected error occurred. It has been reported to our team, ' +
    "and we'll fix it as soon as we can. Please try again in a few minutes.",
};
