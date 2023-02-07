import axios from "axios";

export const request = axios.create({
  baseURL:import.meta.env.VITE_BASE_URL+"/api",
  timeout: 15000,
});
request.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
request.defaults.headers.post["Content-Type"] = "application/json";
request.defaults.headers["Access-Control-Allow-Origin"] = "*";
// export const getURL = (uri: string, params?: Record<string, any>) => {
//   const baseURL = request.defaults.baseURL
//   if (baseURL?.slice(-1) === '/' && uri[0] === '/') {
//     uri = uri.slice(1)
//   }

//   if (isEmpty(params)) {
//     return baseURL + uri
//   } else {
//     return baseURL + uri + '?' + new URLSearchParams(params).toString()
//   }
// }  
export { default as AxiosInterceptors } from "./AxiosInterceptors";
