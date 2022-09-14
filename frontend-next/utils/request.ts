import axios from 'axios';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';
import { ErrorParamType, handleErrorAxios } from './helpers';

type AxiosRequestHeaders = {
  [x: string]: string | number | boolean;
}

const request = axios.create({
  // baseURL: process.env.baseURL ,
  withCredentials: true,
  timeout: 40000,
  headers: {
    'content-type': 'application/json',
  },
});

const get = async(arg: string)=> {
  const response = await request?.get(arg);
  return response.data;
};

const deleteRequest = async (arg: string, headers?: AxiosRequestHeaders) => {
  const response = await request?.delete(arg, headers);
  return response.data;
};

const post = async (arg: string, data: any, headers?: AxiosRequestHeaders) => {
  const response = await request?.post(arg, data, headers);
  return response.data;
};

const patch = async(arg: string,  data: any, headers?: AxiosRequestHeaders) => {
  const response = await request?.patch(arg, data, headers);
  return response.data;
};

const put = async(arg: string,  data: any, headers?: AxiosRequestHeaders) => {
  const response = await request?.put(arg, data, headers);
  return response.data;
};

const all = axios.all;
const spread = axios.spread;

class FetchError extends Error {
  response: Response;
  data: {
    error: string;
  };
  code: string;
  constructor({
    code,
    msg,
    response,
    data,
  }: ErrorParamType<any>) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(msg);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    this.response = response ?? null;
    this.data = data || { error: msg };
    this.code = code.toString();
  }
}

export {
  get,
  post,
  put,
  deleteRequest,
  patch,
  all,
  spread,
  FetchError
};

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
