import React from "react";
import { Layout, Menu, Icon } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import Header from "../components/Header";
const { Footer, Content } = Layout;

const Home = ({ user }) => {

  return (
    <Layout
      style={{
        overflow: "auto",
        height: "100vh",
        width: "100%",
        position: "fixed",
        left: 0
      }}
    >
      <Header />
      <Content className="layout">
        <div className="logo" />
        
        <Content style={{ padding: "0 50px" }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            Content
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Content>
    </Layout>
  );
};

export default Home;
