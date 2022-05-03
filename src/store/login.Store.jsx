import { makeAutoObservable } from "mobx";
import { http, setToken, getToken } from "@/utils";

class LoginStore {
  token = getToken() || "";
  constructor() {
    // 响应式
    makeAutoObservable(this);
  }
  getToken = async ({ mobile, code }) => {
    // 调用接口
    const res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile,
      code,
    });
    // 字符串化
    console.log("res" + JSON.stringify(res));
    // 存入token
    this.token = res.token;
    //存入ls
    setToken(this.token);
  };
}

export default LoginStore;
