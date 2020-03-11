import axios from "axios";
import { config } from "./config";

const request = axios.create({
  baseURL: config.url,
  timeout: 150000,
  headers: {
    "Content-Type": "application/json"
  }
});
request.defaults.headers.get["Content-Type"] =
  "application/x-www-form-urlencoded";

/**
 * Post请求
 */
export const requestData = (url, data, timeout) => {
  let options = Object.assign(
    {},
    {
      url: url,
      method: "POST",
      data: data
    }
  );
  if (timeout) {
    options.timeout = timeout;
  }
  let promise = new Promise((resolve, reject) => {
    request
      .request(options)
      .then(res => {
        resolve(res);
      })
      .catch(res => {
        reject(res);
      });
  });
  return promise;
};

/**
 * get请求
 * @param url
 * @param query
 * @returns {Promise<unknown>}
 */
export const queryData = query => {
  let tempQuery = "";
  if (config.url.indexOf("?") === -1) {
    tempQuery = "?";
  }
  for (let key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      if (
        query[key] !== null &&
        query[key] !== undefined &&
        query[key] !== "" &&
        query[key].length !== 0
      ) {
        tempQuery += "&" + key + "=" + query[key];
      }
    }
  }
  let promise = new Promise((resolve, reject) => {
    request
      .get(encodeURI(config.url + tempQuery))
      .then(rst => {
        resolve(rst);
      })
      .catch(error => {
        reject(error);
      });
  });
  return promise;
};
