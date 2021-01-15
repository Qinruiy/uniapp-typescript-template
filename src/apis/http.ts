import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
const buildURL = require("axios/lib/helpers/buildURL");
const settle = require("axios/lib/core/settle");

export type Method =
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch"
  | "purge"
  | "link"
  | "unlink";

/* 创建axios实例 */
const url: string = "https://jsonplaceholder.typicode.com";
const http = axios.create({
  /**
   * uniApp适配器
   * @param config
   */
  adapter: (config: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      uni.request({
        method: config?.method?.toUpperCase() as UniApp.RequestOptions["method"],
        url:
          config.baseURL +
          buildURL(config.url, config.params, config.paramsSerializer),
        header: config.headers,
        data: config.data,
        responseType: config.responseType,
        success: (response) => {
          settle(resolve, reject, {
            config: config,
            data: response.data,
            status: response.statusCode,
            header: response.header,
            cookies: response.cookies,
          });
        },
        fail: (response) => {
          settle(resolve, reject, { config: config, errMsg: response.errMsg });
        },
      });
    });
  },
  baseURL: url,
});

http.defaults.headers = {
  ...http.defaults.headers,
  // #ifdef H5
  // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
  withCredentials: true,
  // #endif
};

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status } = response;
    switch (status) {
      case 200:
        return Promise.resolve(response.data);
      default:
        return Promise.reject(response.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;

const request = (_method: Method, _url: string) => {
  return function(
    target: Object,
    name: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.value = async function(config: AxiosRequestConfig) {
      try {
        const data = await http.request({
          url: _url,
          method: _method,
          ...config,
        });
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
    };
  };
};

const GET = (url: string) => request("get", url);
const POST = (url: string) => request("post", url);
const PUT = (url: string) => request("put", url);
const DELETE = (url: string) => request("delete", url);

export { GET, POST, PUT, DELETE };
