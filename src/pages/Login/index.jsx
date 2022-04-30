import { Card, Form, Input, Checkbox, Button, message } from "antd";
import logo from "@/assets/logo.png";
import "./index.scss";
import { useStore } from "@/store/index";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { loginStore } = useStore();
  const navigate = useNavigate();

  async function onFinish(values) {
    console.log("Success:", values);
    // 登录
    const { mobile, code } = values;
    try {
      await loginStore.getToken({
        mobile,
        code,
      });
      navigate("/", { replace: true });
      message.success("登录成功");
    } catch (e) {
      message.error(e.response?.data?.message || "登录失败");
    }

    // 跳转首页
    // Link标签的replace属性，使用该属性，跳转路由将不会在history中push一个浏览记录，而是取代上一个浏览记录。 不能够回退
  }

  return (
    <>
      <div className="login">
        <Card className="login-container">
          <img className="login-logo" src={logo} alt="" />
          {/* Form */}
          <Form
            validateTrigger={["onBlur", "onChange"]}
            onFinish={onFinish}
            initialValues={{
              mobile: "13911111111",
              code: "246810",
              remember: true,
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
