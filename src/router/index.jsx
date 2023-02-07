import { createHashRouter } from "react-router-dom";
import { lazy, createRef } from "react";
import App from "../App";
import Main from "../pages/main";

//import PlanManage from "../pages/planManage";
// import AxiosInterceptors from "../service/AxiosInterceptors";
import { request, AxiosInterceptors } from "../service/index";
// import VideoDetail from "../pages/videoDetail";
const Login = lazy(() => import("@/pages/login"));
const PlanManage = lazy(() => import("@/pages/planManage"));
const GroupManage = lazy(() => import("@/pages/groupManage"));
const CardManage = lazy(() => import("@/pages/planManage"));
const Personal = lazy(() => import("@/pages/personal"));
const ArticleDetail = lazy(() => import("@/pages/articleDetail"));
const VideoCategory = lazy(() => import("@/pages/videoCategory"));
const VideoList = lazy(() => import("@/pages/videoList"));
const VideoDetail = lazy(() => import("@/pages/videoDetail"));
export const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <App />
        <AxiosInterceptors request={request}></AxiosInterceptors>
      </>
    ),
    children: [
      {
        path: "/",
        element: <Main></Main>,
        children: [
          {
            path: "/index",
            element: <GroupManage></GroupManage>,
            //index: true,
          },
          {
            path: "/planManage",
            element: <PlanManage></PlanManage>,
          },
          {
            path: "/producitonDate",
            element: <CardManage />,
          },
          {
            path: "/personal",
            element: <Personal></Personal>,
          },
          {
            path: "/articleDetail",
            element: <ArticleDetail></ArticleDetail>,
          },
          {
            path: "/video/category",
            element: <VideoCategory></VideoCategory>,
          },
          {
            path: "/video/list",
            element: <VideoList></VideoList>,
          },
          {
            path: "/video/detail",
            element: <VideoDetail></VideoDetail>,
          },
        ],
      },
      // {
      //   ptah: "*",
      //   element: <h1>404 NotFound</h1>,
      // },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    ptah: "*",
    element: <h1>404 NotFound</h1>,
  },
]);
