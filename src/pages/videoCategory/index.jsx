import React, { memo, useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Input,
  Form,
  message,
  Tabs,
  Space,
  Select,
  Upload,
  Image,
} from "antd";
import { useSelector } from "react-redux";
import {
  getVideoCategory,
  addVideoCategory,
  getAllVideo,
} from "@/service/modules/video";
import dayjs from "dayjs";
import { addVideo } from "@/service/modules/video";
import Video from "@/components/video";
import MiniCard from "../../components/miniCard";
import { useNavigate } from "react-router-dom";
const VideoCategory = memo(() => {
  const [visibile, setVisibile] = useState(false);
  const [visibile2, setVisibile2] = useState(false);
  const { useForm } = Form;
  const [form] = useForm();
  const [form2] = useForm();
  const [list, setList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();
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
        // const url=info.response.d
        setImageUrl(result);
      } else if (info.file.status === "error") {
        message.error("上传失败");
      }
    },
    showUploadList: false,
    listType: "picture-card",
  };
  const videoConfig = {
    name: "file",
    action: import.meta.env.VITE_BASE_URL + "/api/upload/video",
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
        console.log(info.file.response);
        const result = info.file.response.data.url;
        // const url=info.response.d
        setVideoUrl(result);
      } else if (info.file.status === "error") {
        message.error("上传失败,文件类型错误且只能上传一个视频");
      }
    },
    showUploadList: true,
    maxCount: 1,
    // listType: "picture-card",
  };
  const getCategoryList = () => {
    getVideoCategory().then((res) => {
      // console.log(res.data);
      setList(res.data.data.list);
      // setList(res.data.data.list);
    });
  };
  useEffect(() => {
    getCategoryList();
  }, []);
  const info = useSelector((state) => state.userInfoList.info);
  const uploadButton = (
    <div>
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div
        style={{
          marginTop: 8,
        }}
      >
        点击上传
      </div>
    </div>
  );
  const dealForm = () => {
    form.getFieldValue("name");
    addVideoCategory({ userId: info.id, name: form.getFieldValue("name") })
      .then((res) => {
        if (res.data.data.code === 200) {
          message.success("创建成功");
          setVisibile(false);
          getCategoryList();
        }
      })
      .catch((err) => {
        message.error(err.response?.data?.message);
      });
  };
  const dealForm2 = () => {
    addVideo({
      videoCategoryId: form2.getFieldValue("name"),
      poster: imageUrl,
      url: videoUrl,
    })
      .then((res) => {
        if (res.data.data.code === 200) {
          message.success("上传成功");
          setVisibile2(false);
          setImageUrl(null);
          setVideoUrl(null);
          form.setFieldValue("name", "");
          getCategoryList();
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };
  return (
    <div>
      <Row gutter={24}>
        <Col span={20}></Col>
        <Col>
          <Space>
            <Button type="primary" onClick={() => setVisibile(true)}>
              添加分类
            </Button>
            <Button type="primary" onClick={() => setVisibile2(true)}>
              添加视频
            </Button>
          </Space>
        </Col>
      </Row>
      {
        <div className="w-full flex flex-wrap space-x-3 space-y-20">
          <Tabs
            tabPosition="top"
            itemID="tabMain"
            items={(list || []).map((item1, index) => {
              return {
                label: item1.name,
                key: item1.id,
                children: (item1.videos || []).map((item, index) => (
                  <span
                    onClick={() =>
                      navigate("/video/detail", { state: { ...item } })
                    }
                    style={{ margin: "25px" }}
                  >
                    <MiniCard
                      cover={item?.poster}
                      title={item1.name}
                      description={dayjs(item?.createAt).format(
                        "YYYY-MM-DD-hh:mm:ss"
                      )}
                    ></MiniCard>
                  </span>
                )),
              };
            })}
          ></Tabs>
        </div>
      }
      {/* {(list || []).map((item, index) => (
        <div className="flex flex-wrap space-x-4">
          <Video url={item.url} poster={item.poster} category={item.videoCategory.name}></Video>
        </div>
      ))} */}

      <Modal
        open={visibile}
        onCancel={() => setVisibile(false)}
        onOk={dealForm}
      >
        <Form form={form} className="mt-7">
          <Form.Item
            label="分类名称"
            name={"name"}
            rules={[{ required: true, message: "分类名称必填" }]}
          >
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={visibile2}
        onCancel={() => setVisibile2(false)}
        onOk={dealForm2}
      >
        <Form form={form2} className="mt-7">
          <Form.Item
            label="分类名称"
            name={"name"}
            rules={[{ required: true, message: "分类名称必填" }]}
          >
            <Select>
              {(list || []).map((item, index) => (
                <Select.Option value={item.id}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="封面"
            rules={[{ required: true, message: "封面必填" }]}
          >
            <Upload {...uploadConfig}>
              {imageUrl?.length > 0 ? (
                <Image src={imageUrl}></Image>
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label="视频素材"
            rules={[{ required: true, message: "素材必须上传" }]}
          >
            <Upload {...videoConfig}>
              <Button type="primary">点击上传</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

export default VideoCategory;
