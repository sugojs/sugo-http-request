import * as http from 'http';
import * as querystring from 'querystring';
import * as url from 'url';

export const VALID_URL = '/foo/fighters';
export const STRING_ERROR_URL = '/string/error';
export const OBJECT_ERROR_URL = '/object/error';
export const CUSTOM_ERROR_NAME = 'CustomError';

interface IRequest extends http.IncomingMessage {
  path?: string;
  query?: querystring.ParsedUrlQuery;
  body?: any;
}

interface IResponse extends http.ServerResponse {
  path?: string;
  query?: querystring.ParsedUrlQuery;
  body?: any;
}

export const server = http.createServer((req: IRequest, res: IResponse) => {
  const { pathname, query } = url.parse(req.url || '', true);
  req.path = pathname;
  req.query = query;
  let body = Buffer.from('');
  req
    .on('data', data => {
      const auxBuffer: any = Buffer.from(data, 'utf8');
      body = Buffer.concat([body, auxBuffer]);
    })
    .on('end', () => {
      if (req.path === VALID_URL) {
        req.body = body.length > 0 ? JSON.parse(body.toString()) : {};
        res.writeHead(200);
        res.end(
          JSON.stringify({
            reqBody: req.body,
            reqMethod: req.method,
            reqPath: req.path,
            reqQueryString: req.query,
            status: 200,
          }),
        );
      } else if (req.path === STRING_ERROR_URL) {
        res.writeHead(400);
        res.end('This is a string error!');
      } else if (req.path === OBJECT_ERROR_URL) {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            name: CUSTOM_ERROR_NAME,
            status: 400,
          }),
        );
      } else {
        res.writeHead(404);
        res.end(
          JSON.stringify({
            message: 'Resource not found!.',
            status: 404,
          }),
        );
      }
    });
});
