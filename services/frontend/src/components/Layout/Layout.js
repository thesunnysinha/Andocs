import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { CssBaseline } from "@mui/material";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SnackBar from "./Snackbar";

const LayoutWrapper = styled.div`
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageWrapper = styled.div`
  position: relative;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #666666 #f0f0f0; /* Track color and thumb color */

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #666666;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }

  .page-enter {
    opacity: 0;
  }
  .page-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in-out;
  }
  .page-exit {
    opacity: 1;
  }
  .page-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }
`;

const Layout = () => {
  return (
    <>
      <LayoutWrapper>
        <div className="sticky top-0 z-99">
          <SnackBar />
        </div>
        <CssBaseline />
        <Navbar />
        <TransitionGroup>
          <CSSTransition classNames="page" timeout={300}>
            <PageWrapper>
              <div style={{ marginTop: "80px" }}>
                <Outlet />
              </div>
            </PageWrapper>
          </CSSTransition>
        </TransitionGroup>
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default Layout;
