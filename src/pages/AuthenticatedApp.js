import React from "react";
import { Layout, Menu, Icon } from "antd";
import Header from "../components/Header";
import { Router, Redirect, Match } from '@reach/router';
import Profile from "./Profile";
import AnnouncementForm from "./AnnouncementForm";
import Home from "./Home";
import AnnouncementDetail from "./AnnouncementDetail";
import NotFound from "./NotFound";
import CreateAnnouncement from "./CreateAnnouncement";
import UpdateAnnouncement from "./UpdateAnnouncement";

const { Footer, Content } = Layout;

const AuthenticatedApp = ({ user }) => {
  return (
    <Layout
      style={{
        overflow: 'auto',
        height: '100vh',
        width: '100%',
        position: 'fixed',
        left: 0
      }}
    >
      <Header />
      <Router
        style={{
          padding: '0 64px 64px 64px'
        }}
      >
        <Profile path="/profile" />
        <AnnouncementDetail path="/announcements/:id" />
        <UpdateAnnouncement path="/update-announcement/:id" />
        <CreateAnnouncement path="/create-announcement" />
        <Home path="/" />
        <NotFound default />
      </Router>
    </Layout>
  );
};

export default AuthenticatedApp;
