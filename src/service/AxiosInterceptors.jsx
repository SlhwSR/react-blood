import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import useLatestValue from "@/hooks/useLatestValue";
import local from "@/utils/local";
import qs from "qs";
import { judgArr } from "@/utils/pararms";
import { useLocation } from "react-router-dom";
const silentCode = ["NOT_SET_TOTP_SECRET", "NOT_SET_PAY_PASSWORD"];
import nProgress from "nprogress";
const AxiosInterceptors = (props) => {
  //const auth = useLatestValue(useAuthStore);
  const location = useLocation();
  const navigate = useLatestValue(useNavigate);
  useMemo(() => {
    if (props.request.interceptorInitialized) return; //解决热跟新的bug
    props.request.interceptorInitialized = true;
    props.request.interceptors.request.use(
      (config) => {
        console.log("ccccc" + location.pathname);
        nProgress.start();
        // config.headers["Authorization"] =
        //   // local.get("token") || "d958911d-031f-4c80-b5ee-64467608ff9c";
        //   "Bearer " +
        //   window.localStorage.getItem("blog-token")?.split('"')?.join("");
        if (config.method === "get" && config.params !== null) {
          if (judgArr(config.params)) {
            config.paramsSerializer = function (params) {
              return qs.stringify(params, { arrayFormat: "repeat" });
            };
          }
        }
        return config;
      },
      (err) => {
        nProgress.done();
        console.log("前置异常--------------");
        console.log(err);
        return Promise.reject(err);
      }
    );
    props.request.interceptors.response.use(
      (response) => {
        nProgress.done();
        return response;
      },
      (err) => {
        nProgress.done();
        // if (err?.response?.data.statusCode === 401) {
        //   message.error("未授权请先登录！");
        //   navigate.current("/login");
        // }
        // console.log("---后置");
        // message.error(JSON.stringify(err.response))
        // console.log();
        // if(err?.response.data.)
        return Promise.reject(err);
      }
    );
  }, []);
  return null;
};

export default AxiosInterceptors;
