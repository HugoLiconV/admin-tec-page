import React from "react";
import { Layout, Menu, Icon, Avatar, Dropdown } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { useAuth } from "../context/auth-context";
import "./Header.css";

const Header = () => {
  const {
    data: { user },
    logout
  } = useAuth();

  function handleMenuClick(e) {
    console.log("TCL: handleMenuClick -> e", e);
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Icon type="smile" />
        <span>Perfil</span>
      </Menu.Item>
      <Menu.Item>
        <Icon type="logout" />
        <span>Cerrar Sesión</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header
      className="header"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <Menu onClick={handleMenuClick} selectedKeys={["mail"]} mode="horizontal">
        <Menu.Item key="mail">
          <Icon type="mail" />
          Navigation One
        </Menu.Item>
        <Menu.Item key="app">
          <Icon type="appstore" />
          Navigation Two
        </Menu.Item>
        <Menu.Item key="alipay">
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
      <div style={{ flex: 1 }} />
      <Avatar
        src={user && user.picture}
        style={{ margin: "auto 10px" }}
      />
      <Dropdown overlay={menu}>
        <span className="ant-dropdown-link" style={{fontSize: 18}}>
          {(user && user.name) || ""} <Icon type="down" />
        </span>
      </Dropdown>
    </Layout.Header>
  );
};

export default Header;
