export const ERROR_NETWORK_CODE = -100;
export const STATUS_TIME_OUT = 'ECONNABORTED';
export const CODE_TIME_OUT = 408;
export const SERVER_ERROR = 500;
export const UNAUTHORIZED = 401;
import { AxiosError } from 'axios';

interface ResponseBase {
  code: number;
  msg: string;
}

export interface ErrorParamType<T=any> extends ResponseBase {
  response?: T;
  data: {error: string} 
}


const handleData = (responseError: ResponseBase) => {
  return responseError;
};


export const handleErrorAxios = (error: AxiosError): ErrorParamType<any> => {
  if (error.code === STATUS_TIME_OUT) {
    // timeout
    return {...HandleErrorApi(SERVER_ERROR),
              data: {error: "REQUEST TIMED OUT"}    
            };
  }
  if (error.response) {
      return {...HandleErrorApi(error.response.status),
                response: error.response,
                data: { error: error.response.data.error ? error.response.data.error : error.response.statusText},
              };
  
  }else if(error.request) {
    console.log("REQUEST", error.request);
    return {...HandleErrorApi(error.request.status),
              data: {error: error.request.statusText ?? "SERVER ERROR"}
            };
  }
  return {...HandleErrorApi(SERVER_ERROR),
          data: { error: "SERVER ERROR"}
          };
};

export const HandleErrorApi = (status: number) => {
  switch (status) {
    case ERROR_NETWORK_CODE:
      return handleData({
        code: ERROR_NETWORK_CODE,
        msg: 'error:errorNetwork',
      });
    case 200:
      return handleData({
        code: status,
        msg: 'error:0',
      });
    case 400:
      return handleData({
        code: status,
        msg: 'error:400',
      });
    case 401:
      return handleData({
        code: status,
        msg: 'error:401',
      });
    case 402:
      return handleData({
        code: status,
        msg: 'error:402',
      });
    case 403:
      return handleData({
        code: status,
        msg: 'error:403',
      });
    case 404:
      return handleData({
        code: status,
        msg: 'error:404',
      });
    case 405:
      return handleData({
        code: status,
        msg: 'error:405',
      });
    case 406:
      return handleData({
        code: status,
        msg: 'error:406',
      });
    case 407:
      return handleData({
        code: status,
        msg: 'error:407',
      });
    case 408:
      return handleData({
        code: status,
        msg: 'error:408',
      });

    case 409:
      return handleData({
        code: status,
        msg: 'error:409',
      });
    case 410:
      return handleData({
        code: status,
        msg: 'error:410',
      });

    case 411:
      return handleData({
        code: status,
        msg: 'error:411',
      });
    case 412:
      return handleData({
        code: status,
        msg: 'error:412',
      });

    case 413:
      return handleData({
        code: status,
        msg: 'error:413',
      });
    case 414:
      return handleData({
        code: status,
        msg: 'error:414',
      });
    case 415:
      return handleData({
        code: status,
        msg: 'error:415',
      });
    case 416:
      return handleData({
        code: status,
        msg: 'error:416',
      });
    case 417:
      return handleData({
        code: status,
        msg: 'error:417',
      });
    case 500:
      return handleData({
        code: status,
        msg: 'error:500',
      });
    case 501:
      return handleData({
        code: status,
        msg: 'error:501',
      });
    case 502:
      return handleData({
        code: status,
        msg: 'error:502',
      });
    case 503:
      return handleData({
        code: status,
        msg: 'error:503',
      });
    case 504:
      return handleData({
        code: status,
        msg: 'error:504',
      });
    case 505:
      return handleData({
        code: status,
        msg: 'error:505',
      });

    default:
      if (status > 503) {
        return handleData({
          code: status,
          msg: 'error:serverError'
        });
      } else if (status < 500 && status >= 400) {
        return handleData({
          code: status,
          msg: 'error:errorOnRequest'
        });
      } else {
        return handleData({
          code: status,
          msg: 'error:errorOnHandle'
        });
      }
  }
};
