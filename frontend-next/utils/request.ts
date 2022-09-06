import axios from 'axios';

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
    console.log("response", response);
    return response?.data ? response?.data : response;
  },
  (error) => {
    if (error.response) {
      console.log(error.response);
      throw new FetchError({
        message: error.response.statusText,
        response: error.response,
        data: error.response.data,
      })
    } else if (error.request) {
      throw error;
    } else {
    }
    console.error(error.config);
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
    message: string;
    error?: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      message: string;
      error?: string;
    };
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    this.response = response;
    this.data = data ?? {message: message};
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
