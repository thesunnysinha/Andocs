import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { CssBaseline } from "@mui/material";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SnackBar from "./Snackbar";

// Styled Components
const LayoutWrapper = styled.div`
  background: #fafafa; /* Light background color */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif; /* Clean font */
`;

const PageWrapper = styled.div`
  position: relative;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1; /* Darker thumb, lighter track */
  padding-bottom: 60px; /* Ensure space for footer */

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 6px;
  }

  .page-enter {
    transform: translateX(100%);
  }

  .page-enter-active {
    transform: translateX(0);
    transition: transform 300ms ease-out;
  }

  .page-exit {
    transform: translateX(0);
  }

  .page-exit-active {
    transform: translateX(-100%);
    transition: transform 300ms ease-in;
  }
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <CssBaseline />
      {/* Navbar */}
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>

      {/* Snackbar */}
      <div className="sticky top-0 z-20">
        <SnackBar />
      </div>

      {/* Main Content Area with Page Transitions */}
      <TransitionGroup>
        <CSSTransition classNames="page" timeout={300}>
          <PageWrapper>
            <div style={{ marginTop: "80px" }}>
              <Outlet />
            </div>
          </PageWrapper>
        </CSSTransition>
      </TransitionGroup>

      {/* Footer */}
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
