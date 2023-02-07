import React, { memo } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getUserCategoryDetail,
  getUserArticle,
  updateAvatar,
} from "@/service/modules/user";
import { useState } from "react";
import { Avatar, Tabs, Upload, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import MiniCard from "../../components/miniCard";
import { useDispatch, useSelector } from "react-redux";
import { saveInfo } from "../../store/info";
const { TabPane } = Tabs;
const Personal = memo(() => {
  const [categoryList, setCategoryList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const getCategoryList = () => {
    getUserCategoryDetail({ id: location.state.personalId }).then((res) => {
      // console.log(res.data.category);
      setCategoryList(res.data.category);
      // console.log(res.data);
    });
  };
  const getArticleList = () => {
    getUserArticle(location.state.personalId).then((res) => {
      // console.log(res.data.data);
      setArticleList(res.data.data);
    });
  };
  const userinfo = useSelector((state) => state.userInfoList.info);
  useEffect(() => {
    console.log("---参数");
    console.log(location.state);
    getCategoryList();
  }, []);
  const changeTab = (val) => {
    if (val === 1) {
      getCategoryList();
    } else {
      getArticleList();
    }
  };
  const uploadConfig = {
    name: "file",
    action: import.meta.env.VITE_BASE_URL + "/api/upload/image",
    headers: {
      authorization:
        "Bearer " +
        window.localStorage.getItem("blog-token").split('"').join(""),
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name}` + "上传成功");
        console.log("--------------------------");
        const result = info.file.response.url;
        // setImageUrl(result);
        updateAvatar({ id: userinfo.id, avatar: result }).then((res) => {
          console.log("-----------更新头像后");
          dispatch(saveInfo(res.data));
          // console.log(res);
        });
        // const url=info.response.d
      } else if (info.file.status === "error") {
        message.error("上传失败");
      }
    },
    showUploadList: false,
    // listType: "picture-card",
  };
  return (
    <div>
      {userinfo.avatar ? (
        <Upload
          {...uploadConfig}
          style={{
            // marginLeft: "500px",
            width: "80px",
            height: "80px",
            cursor: "pointer",
          }}
        >
          <Avatar
            src={userinfo.avatar}
            style={{ width: "80px", height: "80px", marginLeft: "790px" }}
          ></Avatar>
        </Upload>
      ) : (
        <Upload
          {...uploadConfig}
          style={{
            // marginLeft: "500px",
            width: "80px",
            height: "80px",
            cursor: "pointer",
          }}
        >
          <Avatar
            style={{ width: "80px", height: "80px", marginLeft: "790px" }}
            icon={
              <UserOutlined
                style={{ marginTop: "30px", fontSize: "30px" }}
              ></UserOutlined>
            }
          ></Avatar>
        </Upload>
      )}
      <Tabs
        defaultActiveKey="1"
        onChange={changeTab}
        className="w-full"
        items={[
          {
            label: "我创建的分类",
            key: "1",
            children: (
              <div className="w-full flex flex-wrap space-x-3 space-y-3">
                {(categoryList || []).map((item) => (
                  <MiniCard cover={item.cover} title={item.name}></MiniCard>
                ))}
              </div>
            ),
          },
          {
            label: "我创建的文章",
            key: "2",
            children: (
              <div className="w-full flex flex-wrap space-x-3 space-y-3">
                {(articleList || []).map((item, index) => (
                  <MiniCard
                    cover={item.category?.cover}
                    title={item.title}
                    description={item.content}
                  ></MiniCard>
                ))}
              </div>
            ),
          },
        ]}
      ></Tabs>
    </div>
  );
});

export default Personal;
