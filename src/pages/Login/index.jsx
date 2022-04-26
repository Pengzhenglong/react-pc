import { Card, Form, Input, Checkbox, Button } from "antd";
import logo from "@/assets/logo.png";
import "./index.scss";
const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <>
      <div className="login">
        <Card className="login-container">
          <img className="login-logo" src={logo} alt="" />
          {/* Form */}
          <Form
            validateTrigger={["onBlur", "onChange"]}
            onFinish={ onFinish }
            initialValues={{
              mobile: '13911111111',
              code: '246810',
              remember: true
            }}
          >
            <Form.Item
              name="mobile"
              rules={[
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: "手机号码格式不对",
                  validateTrigger: "onBlur",
                },
                { required: true, message: "请输入手机号" },
              ]}
            >
              <Input size="large" placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                { len: 6, message: "验证码6个字符", validateTrigger: "onBlur" },
                { required: true, message: "请输入验证码" },
              ]}
            >
              <Input size="large" placeholder="请输入验证码" maxLength={6} />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox className="login-checkbox-label">
                我已阅读并同意「用户协议」和「隐私条款」
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};
export default Login;
