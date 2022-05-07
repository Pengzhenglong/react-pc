import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

class UserStore {
  userInfo = {};
  constructor() {
    makeAutoObservable(this);
  }
  getUserInfo = async () => {
    // 调用接口获取数据
    const res = await http.get('/user/profile')
    // console.log(this.res.data);
    this.userInfo = res.data
    // console.log(this.userInfo);
  }
}

export default UserStore;
