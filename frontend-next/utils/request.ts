import axios from 'axios';
import {ErrorParamType, handleErrorAxios} from './helpers';

type AxiosRequestHeaders = {
  [x: string]: string | number | boolean;
};

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true,
  timeout: 40000,
  headers: {
    'content-type': 'application/json',
  },
});

request.interceptors.response.use(
  undefined,
  (error) => {
    throw new FetchError(handleErrorAxios(error));
  },
);

async function get<T>(url: string) {
  console.log(`get ${url}`);
  const response = await request.get<T>(url);
  return response.data;
}

async function deleteRequest<T>(url: string, headers?: AxiosRequestHeaders) {
  const response = await request.delete<T>(url, headers);
  return response.data;
}

async function post<T>(url: string, data: any, headers?: AxiosRequestHeaders) {
  const response = await request.post<T>(url, data, headers);
  return response.data;
}

async function patch<T>(url: string, data: any, headers?: AxiosRequestHeaders) {
  const response = await request.patch<T>(url, data, headers);
  return response.data;
}

async function put<T>(url: string, data: any, headers?: AxiosRequestHeaders) {
  const response = await request.put<T>(url, data, headers);
  return response.data;
}

const all = axios.all;
const spread = axios.spread;

class FetchError extends Error {
  response: Response;
  data: {
    error: string;
  };
  code: string;
  constructor({code, msg, response, data}: ErrorParamType<any>) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(msg);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    this.response = response ?? null;
    this.data = data || {error: msg};
    this.code = code.toString();
  }
}

export {get, post, put, deleteRequest, patch, all, spread, FetchError};
