import axios from "axios"
import { devApiBaseUrl, proApiBaseUrl, httpTimeOut } from "@/config/var"

import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios"
import type { ResponseBase } from "@/api/ResponseBase"

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
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
  }

  type request_result = {
    res: ResponseBase<T>
    err: ResponseBase<T>
    isSuccess: boolean
  }
  await instance
    .request<any, AxiosResponse<ResponseBase<T>>>(requestConfig)
    .then(data => {
      result.res = data.data
      result.isSuccess = true
    })
    .catch(err => {
      result.err = err
      result.isSuccess = false
    })
  return result
}

export default req
