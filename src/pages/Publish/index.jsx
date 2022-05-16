import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useStore } from "@/store";
import { observer } from "mobx-react";
import { http } from "@/utils";
import { useSearchParams } from "react-router-dom";
const { Option } = Select;

const Publish = () => {
  const [params] = useSearchParams();
  // console.log(params);
  const articleId = params.get("id");
  // const [value, setValue] = useState("");
  const { channelStore } = useStore();
  const [fileList, setFileList] = useState([]);
  // 暂存图片显示
  // 声明一个暂存仓库
  const fileListRef = useRef([]);
  // 上传成功回调
  const onUploadChange = (info) => {
    console.log(info);
    const fileList = info.fileList.map((file) => {
      if (file.response) {
        return {
          url: file.response.data.url,
        };
      }
      return file;
    });
    setFileList(fileList);
    // 2.上传图片时，将所有图片存储到ref中
    fileListRef.current = fileList;
    console.log("fileListRef" + fileListRef);
  };
  const [imgCount, setImgCount] = useState(1);
  const changeType = (e) => {
    console.log(e);
    // 使用原始数据作为判断条件
    const count = e.target.value;
    setImgCount(count);
    if (count === 1) {
      // 单图，只展示第一张
      const firstImg = fileListRef.current[0];
      setFileList(!firstImg ? [] : [firstImg]);
    } else if (count === 3) {
      // 三图，展示三张
      setFileList(fileListRef.current);
    }
  };
  const onFinish = async (value) => {
    console.log(fileList);
    const { title, content, channel_id, type } = value;
    const params = {
      title,
      content,
      channel_id,
      type,
      cover: {
        type: type,
        images: fileList.map((item) => item.url),
      },
    };
    console.log(params);
    await http.post("/mp/articles?draft=false", params);
  };

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {articleId ? "修改文章" : "发布文章"}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 这里的富文本组件  已经被Form.Item控制 */}
        {/* 它输入的内容  会在onFinished回调中收集起来 */}
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          // initialValues={{ type: 1 }}
          // 注意：此处需要为富文本编辑表示的 content 文章内容设置默认值
          initialValues={{ content: "" }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((channel) => (
                <Option value={channel.id} key={channel.id}>
                  {channel.name}
                </Option>
              ))}
              {/* <Option value={0}>推荐</Option> */}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                maxCount={imgCount}
                multiple={imgCount > 1}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? "修改文章" : "发布文章"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default observer(Publish);
