import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "@/store";
import "./assets/css/base.css";
import "@wangeditor/editor/dist/css/style.css";
import { SwitchTransition } from "react-transition-group";
import Loading from "@/components/loading";
import "animate.css";
dayjs.locale("zh-cn");
ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        colorPrimary: "#2644A3",
        // borderRadius:"0"
      },
      components: {
        Menu: {
          colorInfoBg: "#fff",
        },
      },
    }}
  >
    <Provider store={store}>
      <Suspense fallback={<Loading></Loading>}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </Provider>
  </ConfigProvider>
);
