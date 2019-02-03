import * as assert from 'assert';
import * as http from 'http';
import * as https from 'https';

export interface IHttpResponse {
  status: number;
  message: string;
  data: any;
}

export class HttpClient {
  public request(url: string, data: any, options = {}): Promise<IHttpResponse> {
    assert(data === null || data === undefined || typeof data === 'object', 'Data parameter must be null or an object');
    return new Promise((resolve, reject) => {
      const lib = url.startsWith('https://') ? https : http;
      const req = lib.request(url, options, (res: http.IncomingMessage) => {
        const body: IHttpResponse = {
          status: res.statusCode as number,
          message: http.STATUS_CODES[res.statusCode as number] || '',
          data: null,
        };

        let rawBody = Buffer.from('');
        res.on('data', function(chunk) {
          rawBody = Buffer.concat([rawBody, chunk]);
        });
        res.on('end', function() {
          try {
            body.data = JSON.parse(rawBody.toString());
          } catch (e) {
            body.data = rawBody.toString();
          }
          if ((res.statusCode as number) < 200 || (res.statusCode as number) >= 300) {
            reject(body);
          } else {
            resolve(body);
          }
        });
      });
      req.on('error', function(err) {
        reject(err);
      });
      if (data) {
        req.write(typeof data === 'string' ? data : JSON.stringify(data));
      }
      req.end();
    });
  }

  public options(url: string, options: http.RequestOptions = {}) {
    options.method = 'OPTIONS';
    return this.request(url, null, options);
  }
  public head(url: string, options: http.RequestOptions = {}) {
    options.method = 'HEAD';
    return this.request(url, null, options);
  }
  public trace(url: string, options: http.RequestOptions = {}) {
    options.method = 'TRACE';
    return this.request(url, null, options);
  }
  public get(url: string, options: http.RequestOptions = {}) {
    options.method = 'GET';
    return this.request(url, null, options);
  }
  public post(url: string, data: any, options: http.RequestOptions = {}) {
    options.method = 'POST';
    return this.request(url, data, options);
  }
  public patch(url: string, data: any, options: http.RequestOptions = {}) {
    options.method = 'PATCH';
    return this.request(url, data, options);
  }
  public put(url: string, data: any, options: http.RequestOptions = {}) {
    options.method = 'PUT';
    return this.request(url, data, options);
  }

  public delete(url: string, options: http.RequestOptions = {}) {
    options.method = 'DELETE';
    return this.request(url, null, options);
  }
}

export default new HttpClient();
