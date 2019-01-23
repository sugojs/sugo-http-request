const VALID_URL = "/foo/fighters";
const STRING_ERROR_URL = "/string/error";
const OBJECT_ERROR_URL = "/object/error";
const CUSTOM_ERROR_NAME = "CustomError";
const http = require("http");
const querystring = require("querystring");

exports.VALID_URL = VALID_URL;
exports.STRING_ERROR_URL = STRING_ERROR_URL;
exports.OBJECT_ERROR_URL = OBJECT_ERROR_URL;
exports.CUSTOM_ERROR_NAME = CUSTOM_ERROR_NAME;

exports.server = http.createServer((req, res) => {
  const url = req.url || "";
  const [path, reqQuerystring] = url.split("?");
  req.path = path;
  req.query = querystring.parse(reqQuerystring);
  let body = new Buffer("");
  req
    .on("data", data => {
      let auxBuffer = new Buffer(data, "utf8");
      body = Buffer.concat([body, auxBuffer]);
    })
    .on("end", () => {
      if (req.path === VALID_URL) {
        req.body = body.length > 0 ? JSON.parse(body.toString()) : {};
        res.writeHead(200);
        res.end(
          JSON.stringify({
            status: 200,
            reqPath: req.path,
            reqMethod: req.method,
            reqQueryString: req.query,
            reqBody: req.body
          })
        );
      } else if (req.path === STRING_ERROR_URL) {
        res.writeHead(400);
        res.end("This is a string error!");
      } else if (req.path === OBJECT_ERROR_URL) {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            status: 400,
            name: CUSTOM_ERROR_NAME
          })
        );
      } else {
        res.writeHead(404);
        res.end(
          JSON.stringify({
            status: 404,
            message: "Resource not found!."
          })
        );
      }
    });
});
