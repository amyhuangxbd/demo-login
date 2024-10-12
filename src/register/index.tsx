import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toRegister } from "@/http/axios";
import type { FormProps } from "antd";
import { Button, Form, Input, Progress, message } from "antd";

type FieldType = {
  name?: string;
  password?: string;
  remember?: string;
};

export default function Register() {
  const [code, setCode] = useState<number>();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  // 计算密码强度
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;

    // 长度至少8个字符
    if (password.length >= 8) {
      strength += 1;
    }

    // 同时包含大小写字母
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      strength += 1;
    }

    // 包含数字
    if (/\d/.test(password)) {
      strength += 1;
    }

    // 包含特殊字符
    if (/[@#$%^]/.test(password)) {
      strength += 1;
    }

    // 返回强度百分比
    return (strength / 4) * 100;
  };

  // 处理密码变化
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const res = await toRegister({
      name: values.name as string,
      password: values.password as string,
    });
    setCode(res.code);
    if (res.code !== 200) {
      message.open({
        type: "error",
        content: res.message,
      });
    } else {
      message.open({
        type: "success",
        content: res.message,
      });
      navigate("/login");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign Up</h3>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          //   style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
            hasFeedback
          >
            <Input.Password onChange={handlePasswordChange} />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                Password strength(A-Za-z0-9@#$%^)
              </span>
            }
          >
            <Progress
              percent={passwordStrength}
              showInfo={false}
              strokeColor={
                passwordStrength < 50
                  ? "#ff4d4f" // 弱
                  : passwordStrength < 75
                    ? "#faad14" // 中
                    : "#52c41a" // 强
              }
              status="active"
            />
            <div>
              {passwordStrength < 50
                ? "非常弱"
                : passwordStrength < 75
                  ? "中等"
                  : "非常强"}
            </div>
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The new password that you entered do not match!",
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
          <Form.Item>
            {code === 409 ? (
              <span className=" ml-2">
                User name already exists, go to{" "}
                <Link to="/login" className="font-semibold text-gray-800">
                  Sign in
                </Link>
              </span>
            ) : null}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
