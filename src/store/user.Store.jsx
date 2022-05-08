import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

class UserStore {
  userInfo = {};
  constructor() {
    makeAutoObservable(this);
  }
  getUserInfo = async () => {
    // 调用接口获取数据
    const res = await http.get("/user/profile");
    console.log(res);
    // console.log("userInfo" + JSON.stringify(res));
    this.userInfo = res;
    console.log("mobile" + this.userInfo.mobile);
  };
}

export default UserStore;
