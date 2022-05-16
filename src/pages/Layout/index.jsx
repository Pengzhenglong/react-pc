import { Layout, Menu, Popconfirm } from "antd";

import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
const { Header, Sider } = Layout;
import { useStore } from "@/store";
import { useEffect } from "react";
import { observer } from "mobx-react";
const GeekLayout = () => {
  const location = useLocation();
  // console.log(location);
  const selectedKey = location.pathname;
  // 获取用户的数据
  const { userStore, loginStore, channelStore } = useStore();
  useEffect(() => {
    userStore.getUserInfo();
    channelStore.loadChannelList();
  }, [userStore]);
  // 退出登录
  const navigate = useNavigate();
  const onLogut = () => {
    loginStore.logOut();
    navigate("/login");
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          {/* {userStore.userInfo.mobile} */}
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onLogut}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[selectedKey]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/"> 数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由默认页面 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default observer(GeekLayout);
