import axios from "axios"
import { devApiBaseUrl, proApiBaseUrl, httpTimeOut } from "@/config/var"

import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios"
import type { Request_Data } from "@/api/Request_Data_Type"

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? proApiBaseUrl : devApiBaseUrl,
  timeout: httpTimeOut,
})

//请求拦截器
// instance.interceptors.request.use(
//   (config: object) => {
//     // 添加token到header
//     // let token = setting.takeToken();
//     // if (token) {
//     //     config.headers[setting.tokenHeaderName] = token;
//     // }
//     // return config;
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return Promise.resolve(response)
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

async function req<T>(requestConfig: AxiosRequestConfig) {
  const result: request_result = {
    res: null,
    err: null,
    isSuccess: false,
    isError: false,
  }

  interface Data extends Request_Data {
    data?: T
  }
  type request_result = {
    res: Data
    err: Data
    isSuccess: boolean
    isError: boolean
  }
  await instance
    .request<any, AxiosResponse<Data>>(requestConfig)
    .then(data => {
      result.res = data.data
      result.isSuccess = true
    })
    .catch(err => {
      result.err = err
      result.isError = true
    })
  return result
}

export default req
