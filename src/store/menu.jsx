import {
    createSlice,
    createAsyncThunk
  } from '@reduxjs/toolkit'
// import { getProductionList } from '@/service/modules/productionPlan'
import { createElement } from "react";
import {
    FundOutlined,
    LaptopOutlined,
    UserOutlined,
    EditOutlined,
    ApiFilled,
    HomeOutlined,
    FundTwoTone,
    BarChartOutlined,
    AlignRightOutlined,
    HomeFilled,
  } from "@ant-design/icons";
  const MenuList = createSlice({
    name: "MenuList",
    initialState: {
      mapList: [{
        key: "/",
        icon: createElement(HomeFilled),
        label: "帖子管理",
        children: [
          {
            key: "index",
            //  icon: createElement(UserOutlined),
            label: "文章管理",
          },
          {
            key: "producitonDate",
            // icon: createElement(LaptopOutlined),
            label: "分类管理",
          },
        ],
      },
      {
        key: "video",
        icon: createElement(FundOutlined),
        label: "视频管理",
        children: [
          // {
          //   key: "productionShowList",
          //   icon: createElement(ApiFilled),
          //   label: "计划指令单审核",
          // },
          {
            key: "video/category",
            // icon: createElement(LaptopOutlined),
            label: "视频分类",
          },
          {
            key: "video/list",
            // icon: createElement(BarChartOutlined),
            label: "视频列表",
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
      }]
    },
    reducers: {
      add: (state, action) => {
        state.goodlist.push(action.payload)
      },
      deleteOne: (state, action) => {
        // console.log("哈哈"+ action.payload);
        state.goodlist.splice(action.payload - 1, 1)
      },
      updateOne: (state, action) => {
        state.goodlist[action.payload.key - 1] = action.payload
      },
      saveOne: (state, action) => {
        state.goodlist = action.payload
      }
    }
  })
  export const { add, deleteOne, updateOne, saveOne } = MenuList.actions
  export default MenuList.reducer
  