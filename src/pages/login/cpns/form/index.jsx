import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  CloseCircleOutlined,
  EnterOutlined,
} from "@ant-design/icons";
import {useLocalStorage} from 'react-use'
import { toLogin, toRegister } from "@/service/modules/login";
export const LoginForm = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { loginstate } = props;
  // 登录
  const onFinish = async ({ email, password }) => {
   if(loginstate===false){
    try {
      setLoading(true);
      const result = await toRegister({
        email,
        password,
      });
      console.log("------------");
      console.log(result); 
      message.success("注册成功！请登录");
    } catch (error) {
      message.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
   }else{
    try {
      setLoading(true);
      const {data:{token}} = await toLogin({
        email,
        password,
      });
      message.success("登录成功！");
      console.log("-------------------");
      console.log(token);
      // useLocalStorage('blog-token',JSON.stringify(token))
      window.localStorage.setItem('blog-token',JSON.stringify(token))
      navigate("/index");
    } catch (error) {
      message.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
   }
   
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  }; 
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="账号/邮箱" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password
          autoComplete="new-password"
          placeholder="please enter your password"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button
          onClick={() => {
            form.resetFields();
          }}
          icon={<CloseCircleOutlined />}
        >
          重置
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={loginstate ? <UserOutlined /> : <EnterOutlined />}
        >
          {loginstate ? "登录" : "注册"}
        </Button>
      </Form.Item>
    </Form>
  );
};
