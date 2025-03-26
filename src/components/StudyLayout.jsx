import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";

const StudyLayout = () => {
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: colorBgContainer, minHeight: "100vh" }}
        width={300}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => handleChangeArtifact(e)}
          items={[
            {
              key: "1",
              icon: <FilePdfOutlined />,
              label: "Slide bài giảng",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Video bài giảng",
            },
            {
              key: "3",
              icon: <EditOutlined />,
              label: "Bài tập",
            },
          ]}
        />
      </Sider>
      <Layout>
        <p>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleCollapseButton}
            style={{
              fontSize: "20px",
              width: 64,
              height: 16,
            }}
          />
          <span className="text-xl font-semibold text-[#FFAB01]">
            {chapter?.chapterName} - {lesson?.lessonName}
          </span>
        </p>
        <Content
          style={{
            margin: "16px 16px 0 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
          <div className="px-5 mt-30 w-full">
            <p className="text-left text-lg font-bold text-[#FFAB01] mb-5">
              Bình luận {"(2)"}
            </p>
            <Form>
              <Form.Item>
                <TextArea
                  placeholder="Bình luận dưới tên Mai Van Minh..."
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleTextAreaKeyDown}
                />
              </Form.Item>
              <p className="w-full flex flex-row justify-end items-center gap-x-5">
                <Form.Item>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#FFAB01",
                      color: "#FFF",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                    htmlType="submit"
                    onClick={() => {
                      handleSubmitComment(text);
                    }}
                  >
                    Gửi
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="default"
                    style={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: "rgba(0, 0, 0, 0.45)",
                    }}
                    onClick={() => setText("")}
                  >
                    Huỷ
                  </Button>
                </Form.Item>
              </p>
            </Form>
            {comments.map((comment, index) => {
              return <Comment key={index} comment={comment} />;
            })}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudyLayout;
