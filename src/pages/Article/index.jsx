import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
} from "antd";
// import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import "./index.scss";
import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import img404 from "@/assets/error.png";
import { useState, useEffect } from "react";
import { http } from "@/utils";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  // const onFinish = (values) => {
  //   console.log(values);
  // };
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    async function fetchChannels() {
      const res = await http.get("/channels");
      console.log(res);
      setChannels(res.channels);
    }
    fetchChannels();
  }, []);

  // 文章参数管理
  const [article, setArticle] = useState({
    list: [],
    count: 0,
  });
  // 参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  });
  // 如果异步请求函数需要依赖一些数据的变化而重新执行
  // 推荐把它写在内部
  // 统一不抽离到外面  只要涉及到异步请求的函数 都放到useEffect里面
  // 本质的区别: 写在外面每次组件更新都会重新进行函数初始化 这本身就说一次性能消耗
  // 写在useEffect中  只会在依赖项发生变化的时候  函数才会进行重新初始化
  // 避免性能损失
  // 发送请求接口
  useEffect(() => {
    async function fetchArticle() {
      const res = await http.get("/mp/articles", { params });
      console.log(res);
      const { results, total_count } = res;
      setArticle({
        list: results,
        count: total_count,
      });
    }
    fetchArticle();
  }, [params]);
  // 筛选功能
  const onSearch = (values) => {
    const { status, channels_id, date } = values;
    // 格式化表单数据
    const _params = {};
    //格式化status
    if (channels_id) {
      _params.channels_id = channels_id;
    }
    if (date) {
      _params.begin_pubdate = date[0].format("YYYY-MM-DD");
      _params.end_pubdate = date[1].format("YYYY-MM-DD");
    }
    // 修改params参数  触发接口再次启动
    setParams({
      ...params,
      ..._params,
    });
  };
  // 文章参数管理
  const pageChange = (page) => {
    // 每当拿到当前页数  修改params引起接口更新
    setParams({
      ...params,
      page,
    });
  };
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];

  const data = [
    {
      id: "8218",
      comment_count: 0,
      cover: {
        images: ["http://geek.itheima.net/resources/images/15.jpg"],
      },
      like_count: 0,
      pubdate: "2019-03-11 09:00:00",
      read_count: 2,
      status: 2,
      title: "wkwebview离线化加载h5资源解决方案",
    },
  ];
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={onSearch}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {channels.map((channel) => (
                <Option value={channel.id} key={channel.id}>
                  {channel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={article.list}
          pagination={{
            position: ["bottomCenter"],
            current: params.page,
            pageSize: params.per_page,
            total: article.count,
            onChange: pageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
