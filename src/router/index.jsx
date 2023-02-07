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
    nodeRef: createRef(),
    children: [
      {
        path: "/",
        element: <Main></Main>,
        nodeRef: createRef(),
        children: [
          {
            path: "/index",
            element: <GroupManage></GroupManage>,
            nodeRef: createRef(),
            //index: true,
          },
          {
            path: "/planManage",
            element: <PlanManage></PlanManage>,
            nodeRef: createRef(),
          },
          {
            path: "/producitonDate",
            element: <CardManage />,
            nodeRef: createRef(),
          },
          {
            path: "/personal",
            element: <Personal></Personal>,
            nodeRef: createRef(),
          },
          {
            path: "/articleDetail",
            element: <ArticleDetail></ArticleDetail>,
            nodeRef: createRef(),
          },
          {
            path: "/video/category",
            element: <VideoCategory></VideoCategory>,
            nodeRef: createRef(),
          },
          {
            path: "/video/list",
            element: <VideoList></VideoList>,
            nodeRef: createRef(),
          },
          {
            path: "/video/detail",
            element: <VideoDetail></VideoDetail>,
            nodeRef: createRef(),
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
