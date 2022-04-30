import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

class LoginStore {
  token = "";
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
    this.token = res.token;
  };
}

export default LoginStore;
