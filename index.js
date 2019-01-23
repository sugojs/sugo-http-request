const http = require("http");
const https = require("https");
const assert = require("assert");

const request = (url, data, options = {}) => {
  assert(data === null || data === undefined || typeof data === "object", "Data parameter must be null or an object");
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https://") ? https : http;
    var req = lib.request(url, options, function(res) {
      const defaultBody = {
        status: res.statusCode,
        message: http.METHODS[res.statusCode]
      };

      let rawBody = Buffer.from("");
      let body;
      res.on("data", function(chunk) {
        rawBody = Buffer.concat([rawBody, chunk]);
      });
      res.on("end", function() {
        rawBody = rawBody.toString();
        try {
          body = Object.assign(defaultBody, JSON.parse(rawBody));
        } catch (e) {
          body = Object.assign(defaultBody, { detail: rawBody });
        }
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(body);
        } else {
          resolve(body);
        }
      });
    });
    req.on("error", function(err) {
      reject(err);
    });
    if (data) {
      req.write(typeof forma === "string" ? data : JSON.stringify(data));
    }
    req.end();
  });
};

exports.request = request;
exports.options = (url, options = {}) => {
  options.method = "OPTIONS";
  return request(url, null, options);
};
exports.head = (url, options = {}) => {
  options.method = "HEAD";
  return request(url, null, options);
};
exports.head = (url, options = {}) => {
  options.method = "HEAD";
  return request(url, null, options);
};
exports.trace = (url, options = {}) => {
  options.method = "TRACE";
  return request(url, null, options);
};
exports.get = (url, options = {}) => {
  options.method = "GET";
  return request(url, null, options);
};
exports.post = (url, data, options = {}) => {
  options.method = "POST";
  return request(url, data, options);
};
exports.patch = (url, data, options = {}) => {
  options.method = "PATCH";
  return request(url, data, options);
};
exports.put = (url, data, options = {}) => {
  options.method = "PUT";
  return request(url, data, options);
};

exports.delete = (url, options = {}) => {
  options.method = "DELETE";
  return request(url, null, options);
};
