import { createElement } from "react";
import {
  FundOutlined,
  HomeFilled,
} from "@ant-design/icons";
export const ColumnList = [
  {
    key: "/",
    icon: createElement(HomeFilled),
    label: "Category/Article",
    children: [
      {
        key: "index",
        //  icon: createElement(UserOutlined),
        label: "Article",
      },
      {
        key: "producitonDate",
        // icon: createElement(LaptopOutlined),
        label: "category",
      },
      // {
      //   key: "planManage/productionEdit",
      //   icon: createElement(EditOutlined),
      //   label: "生产计划填报",
      // },
    ],
  },
  {
    key: "productionManage",
    icon: createElement(FundOutlined),
    label: "请验单管理",
    children: [
      {
        key: "productioConfirm",
        // icon: createElement(LaptopOutlined),
        label: "计划指令单分解",
      },
      {
        key: "orderInfoList",
        // icon: createElement(BarChartOutlined),
        label: "计划指令单确认",
      },
      // {
      //   key:'productioConfirm',
      //   icon: createElement(AlignRightOutlined),
      //   label: "分解指令单列表",
      // }
    ],
  },
  {
    key: "checkCondition",
    icon: createElement(FundOutlined),
    label: "检验管理",
    children: [
      {
        key: "confirmSure",
        // icon: createElement(BarChartOutlined),
        label: "计划指令单确认",
      },
    ],
  },
  {
    key: "reportManage",
    icon: createElement(FundOutlined),
    label: "报告管理",
    children: [
      {
        key: "reportSure",
        // icon: createElement(BarChartOutlined),
        label: "报告确认",
      },
    ],
  },
  {
    key: "FactoryManage",
    icon: createElement(FundOutlined),
    label: "库房管理",
    children: [
      {
        key: "FactorySure",
        // icon: createElement(BarChartOutlined),
        label: "库房确认",
      },
    ],
  },
  {
    key: "basicConfig",
    icon: createElement(FundOutlined),
    label: "基础配置",
    children: [
      {
        key: "basicConfigSure",
        // icon: createElement(BarChartOutlined),
        label: "基础配置确认",
      },
    ],
  },
];
export const navheaer = [
  {
    key: "planManage",
    label: "首页",
  },
  {
    key: "chart",
    label: "图表",
  },
  {
    key: "personal",
    label: "个人中心",
  },
  {
    key: "login",
    label: "退出",
  },
];
