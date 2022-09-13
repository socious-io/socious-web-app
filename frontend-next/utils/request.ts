import axios from 'axios';
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

request?.interceptors.response.use(
  (response) => {
    console.log("RESPONSE", response);
    return response?.data ? response?.data as any : response as any;
  },
  (error) => {
    console.log("error", error);
    throw new FetchError(handleErrorAxios(error));
  },
);

const get = (arg: string)=> {
  return request?.get(arg);
};

const deleteRequest = (arg: string, headers?: AxiosRequestHeaders) => {
  return request?.delete(arg, headers);
};

const post = (arg: string, data: any, headers?: AxiosRequestHeaders) => {
  return request?.post(arg, data, headers);
};

const patch = (arg: string,  data: any, headers?: AxiosRequestHeaders) => {
  return request?.patch(arg, data, headers);
};

const put = (arg: string,  data: any, headers?: AxiosRequestHeaders) => {
  return request?.put(arg, data, headers);
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
