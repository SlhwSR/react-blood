import {
  DatePicker,
  Col,
  Image,
  Layout,
  Button,
  Row,
  Avatar,
  Menu,
  Popover,
  List,
  Space,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import React, { memo, Suspense, useEffect, useRef } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useOutlet,
} from "react-router-dom";
import longLogo from "@/assets/img/longLogo.png";
import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getPersonalInfo } from "@/service/modules/personal";
import { modifyPassword } from "@/service/modules/user";
import { useState } from "react";
import { saveInfo } from "../../store/info";
import { CSSTransition, Transition } from "react-transition-group";
import "@/assets/css/transition.css";
import Loading from "@/components/loading";
const { Header, Content, Sider } = Layout;
const Main = memo(() => {
  const navigate = useNavigate();
  const mapList = useSelector((state) => state.MenuList.mapList);
  const [info, setInfo] = useState();
  const { useForm } = Form;
  const dispatch = useDispatch();
  const [form] = useForm();
  const animateRef = useRef(null);
  const location = useLocation();
  const [passwordVisibile, setPasswordVisibile] = useState(false);
  const currentOutLet = useOutlet();
  const userInfo = useSelector((state) => state.userInfoList.info);

  useEffect(() => {
    navigate("/index");
    // console.log("-----------测试env环境");
    // console.log();
    getPersonalInfo().then((res) => {
      dispatch(saveInfo(res.data));
      setInfo(res.data);
    });
  }, []);
  const Controlbread = (item, key, value) => {
    console.log(item + "---" + key + "-----" + value);
    navigate(`/${key}`);
    //setbread(key);
  };
  const quitLogin = () => {
    window.localStorage.removeItem("blog-token");
    navigate("/login", { replace: "/login" });
  };
  const dealPawword = () => {
    console.log(form.getFieldsValue());
    modifyPassword(info.id, form.getFieldsValue())
      .then((res) => {
        // console.log(res);
        if (res.data.data.code === 200) {
          message.error("修改成功请重新登录");
          window.localStorage.removeItem("blog-token");
          navigate("/login", { replace: "/login" });
        }
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        message.error(err.response.data.message);
      });
  };
  return (
    <Layout>
      <Header style={{ background: "#fff" }}>
        <Row gutter={24}>
          <Col span={2}>
            <span className="b">随意-Admin</span>
          </Col>
          <Col>
            <Button
              //    onClick={() => setCollapsed(!collapsed)}
              type="text"
              size="large"
            >
              {<MenuFoldOutlined />}
            </Button>
          </Col>
          <Col span={18}></Col>
          <Col className="ml-7">
            <Space size={"small"}>
              <span className="-mr-8">{info?.email}</span>
              <Popover
                content={
                  <List>
                    <List.Item>
                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          navigate("/personal", {
                            state: { personalId: info.id },
                          })
                        }
                      >
                        个人中心
                      </span>
                    </List.Item>
                    <List.Item>
                      <span
                        className="cursor-pointer"
                        onClick={() => setPasswordVisibile(true)}
                      >
                        修改密码
                      </span>
                    </List.Item>
                    <List.Item>
                      <span
                        className="cursor-pointer"
                        onClick={() => quitLogin()}
                      >
                        退出登录
                      </span>
                    </List.Item>
                  </List>
                }
              >
                {userInfo.avatar ? (
                  <Avatar
                    alt="用户头像"
                    src={userInfo.avatar}
                    style={{ marginLeft: "95%", cursor: "pointer" }}
                  ></Avatar>
                ) : (
                  <Avatar
                    alt="用户头像"
                    icon={<UserOutlined />}
                    style={{ marginLeft: "95%", cursor: "pointer" }}
                  ></Avatar>
                )}
              </Popover>
            </Space>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider width={200} style={{ overflow: "hidden" }}>
          <Menu
            mode="inline"
            theme={"dark"}
            defaultSelectedKeys={["plan"]}
            defaultOpenKeys={["bed"]}
            style={{
              borderRight: 0,
            }}
            onClick={({ item, key, keypath }) =>
              Controlbread(item, key, keypath)
            }
            items={mapList}
          ></Menu>
        </Sider>
        <Layout
          style={{
            padding: "24px 24px 24px",
            minHeight: "1000px",
          }}
        >
          <Suspense fallback={<Loading></Loading>} style={{ overflow: "auto" }}>
            <Content
              style={{
                padding: "24px 24px",
                minHeight: "780px",
                overflow: "auto",
                backgroundColor: "#fff",
              }}
            >
              <Outlet></Outlet>
            </Content>
          </Suspense>
        </Layout>
      </Layout>
      <Modal
        open={passwordVisibile}
        onCancel={() => setPasswordVisibile(false)}
        onOk={dealPawword}
      >
        <Form form={form} className="mt-5">
          <Form.Item label="旧密码" name={"oldPassword"}>
            <Input placeholder="请输入旧密码"></Input>
          </Form.Item>
          <Form.Item label="新密码" name={"newPassword"}>
            <Input placeholder="请输入旧密码"></Input>
          </Form.Item>
          <Form.Item label="确认新密码" name={"confirmPassword"}>
            <Input placeholder="请输入旧密码"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
});
export default Main;
