# **@sugo/http-request (http-request-promise-simple)**

Dependency-less http methods for pure nodejs. Wraps the [nodejs http module](https://nodejs.org/api/http.html) in promises and handles some of the request events (like building the request body).

## **How to install**

```shell
npm install --save @sugo/http-request
```

## **Methods**

All methods recieve an **options** parameter, this corresponds to the [node http request options](https://nodejs.org/api/http.html#http_http_request_options_callback).

Additionally to the nodejs options, it also recieves a **https** boolean options in order to use a https request instead of a http request.

Some methods can be passed a **data** parameter, this corresponds to the request body. This must be an Object.

- **request(url, options):** A generic http request, it uses by default the get method but can be used to make any type of request.

- **get(url, options):** A wrapper for the request method that forces the request to be of the GET type.

- **head(url, options):** A wrapper for the request method that forces the request to be of the HEAD type.

- **options(url, options):** A wrapper for the request method that forces the request to be of the OPTIONS type.

- **connect(url, options):** A wrapper for the request method that forces the request to be of the CONNECT type.

- **trace(url, options):** A wrapper for the request method that forces the request to be of the TRACE type.

- **post(url, data, options):** A wrapper for the request method that forces the request to be of the POST type.

- **put(url, data, options):** A wrapper for the request method that forces the request to be of the PUT type.

- **patch(url, data, options):** A wrapper for the request method that forces the request to be of the PATCH type.

- **deleteRequest(url, options):** A wrapper for the request method that forces the request to be of the DELETE type.

## **Example - Promise**

```typescript
import httpClient = require('@sugo/http-request');
return httpClient
  .get('http://localhost:8080/foo/bar')
  .then(res => console.info(res.status))
  .catch(error => console.error(error));
```

## **Example - Async/Await**

```typescript
import httpClient = require('@sugo/http-request');
const res = await httpClient.get('http://localhost:8080/foo/bar');
```
