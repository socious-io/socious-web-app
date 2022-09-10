import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
  },
};

// export const API_BASE_URL = process.env.API_BASE_URL || 'http://127.0.0.1:5061';
export const API_BASE_URL = process.env.API_BASE_URL || 'https://dev.socious.io/api/v2';

function proxy(req: NextApiRequest, res: NextApiResponse) {
  console.log(`proxying ${req.url} in ${process?.env?.NODE_ENV} to ${API_BASE_URL}`);
  return (process && process.env.NODE_ENV !== 'production')
    ? httpProxyMiddleware(req, res, {
      target: API_BASE_URL,
      // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`
      pathRewrite: [
        {
          patternStr: '^/api/v2/',
          replaceStr: '/',
        },
      ],
    })
    : res.status(404).send(null);
}

export default proxy;
