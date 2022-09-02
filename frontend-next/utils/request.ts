import axios from 'axios';
import { any, boolean } from 'joi';

type AxiosRequestHeaders = {
  [x: string]: string | number | boolean;
}

const request = axios.create({
  // baseURL: process.env.baseURL,
  withCredentials: true,
  timeout: 40000,
  headers: {
    'content-type': 'application/json',
  },
});

request?.interceptors.response.use(
  (response: any) => {
    return response?.data ? response?.data : response;
  },
  (error: any) => {
    console.log("ERROR", error);
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
      throw error
    }
    console.error(error.config);
  },
);

const get = (arg: string, headers?: AxiosRequestHeaders)=> {
  console.log("GET", headers);

  return request?.get(arg, headers);
};

const deleteRequest = (arg: string) => {
  return request?.delete(arg);
};

const post = (arg: string, data: any, headers?: AxiosRequestHeaders) => {
  console.log("HEADERS", headers);
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

export const doCORSRequest = async (options: any) => {
  return new Promise((resolve: (response: any) => void) => {
    const requestCORS = new XMLHttpRequest();
    requestCORS.open(options.method, options.url);
    requestCORS.onload = requestCORS.onerror = function () {
      resolve(
        typeof requestCORS?.responseText === 'string'
          ? requestCORS?.responseText
          : JSON.parse(requestCORS?.responseText),
      );
    };
    requestCORS.withCredentials = false;
    if (/^POST/i.test(options.method)) {
      requestCORS.setRequestHeader('Content-Type', 'application/json');
      requestCORS.send(JSON.stringify(options.data));
    }
    if (/^GET/i.test(options.method)) {
      // requestCORS.setRequestHeader("Content-Type", "application/json");
      // x.setRequestHeader("Authorization", "Bearer " + options?.token);

      requestCORS.send(JSON.stringify(options.data));
    }
  });
};

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
