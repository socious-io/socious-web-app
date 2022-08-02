import {useMemo} from 'react';
import axios from 'axios';

const useRequest = () => {
  const request = useMemo(() => {
    return axios.create({
      // baseURL: process.env.baseURL ,
      withCredentials: true,
      timeout: 10000,
      headers: {
        'content-type': 'application/json',
      },
    });
  }, []);

  request?.interceptors?.response.use(
    (response) => {
      return response?.data ? response?.data : response;
    },
    (error) => {
      throw error;
    },
  );


  const get = (arg: string) => {
    return request?.get(arg);
  };

  const deleteRequest = (arg: string) => {
    return request?.delete(arg);
  };

  const post = (arg: string, body: any) => {
    return request?.post(arg, body);
  };

  const patch = (arg: string, body: any) => {
    return request?.patch(arg, body);
  };

  const put = (arg: string, body: any) => {
    return request?.put(arg, body);
  };

  const all = axios.all;
  const spread = axios.spread;

  const doCORSRequest = async (options: any) => {
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

  return {
    request,
    get,
    post,
    put,
    deleteRequest,
    patch,
    all,
    spread,
    doCORSRequest,
  };
};

export default useRequest;
