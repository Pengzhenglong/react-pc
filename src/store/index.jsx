import React from "react";
import LoginStore from "./login.Store";
// 将所有的模块做统一的处理
// 导出一个统一的方法  useStore
class RootStore {
  // 组合模块
  constructor() {
    this.loginStore = new LoginStore();
  }
}
//实例化根
// 导出userStore  context
const rootStore = new RootStore();
const context = React.createContext(rootStore);

const useStore = () => React.useContext(context);
export { useStore };

// import React from "react"
// import LoginStore from './login.Store'

// class RootStore {
//   // 组合模块
//   constructor() {
//     this.loginStore = new LoginStore()
//   }
// }
// // 导入useStore方法供组件使用数据
// const StoresContext = React.createContext(new RootStore())
// export const useStore = () => React.useContext(StoresContext)
