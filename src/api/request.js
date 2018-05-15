// @flow

import config from "../config";

require("isomorphic-fetch");

const appendQueryParams = (path, queryParams) => {
  const e = encodeURIComponent;
  const paramStr = Object.keys(queryParams)
    .map(key => `${e(key)}=${e(queryParams[key])}`)
    .join("&");

  const joinedBy = path.indexOf("?") > -1 ? "&" : "?";

  return `${path}${joinedBy}${paramStr}`;
};

const getUrl = (path, queryParams) => {
  return queryParams ? appendQueryParams(path, queryParams) : path;
};

const handleResponse = response => {
  if (!response.ok) {
    return response.json().then(err => err);
  }

  return response.json();
};

const handleError = err => {
  if (config.NODE_ENV !== "production") {
    console.error(err);
  }
};

class RequestClient {
  constructor(hostname) {
    this.hostname = hostname || config.API_HOST;
    this.defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }

  sign(options = {}, token) {
    if (!token) return options;

    const headers = Object.assign(options.headers || {}, {
      Authorization: token
    });

    options.headers = headers;
    return options;
  }

  request(method, route, options = {}) {
    const path = `${this.hostname}${route}`;
    const headers = {
      ...this.defaultHeaders,
      ...options.headers
    };

    const opts = Object.assign(options, {
      method,
      headers: new Headers(headers),
      body: method !== "GET" ? JSON.stringify(options.body) : null
    });

    return fetch(getUrl(path, opts.queryParams), opts);
  }

  get(route, options = {}) {
    return this.request("GET", route, options)
      .then(handleResponse)
      .catch(handleError);
  }

  post(route, options = {}) {
    return this.request("POST", route, options)
      .then(handleResponse)
      .catch(handleError);
  }

  put(route, options = {}) {
    return this.request("PUT", route, options)
      .then(handleResponse)
      .catch(handleError);
  }

  delete(route, options = {}) {
    return this.request("DELETE", route, options)
      .then(handleResponse)
      .catch(handleError);
  }
}

export default new RequestClient();
