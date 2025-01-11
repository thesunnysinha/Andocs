import React, { useState, useEffect, useMemo } from "react";
import { Grid, Card, Tabs, Tab, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import loginImage from "./images/login.png";

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const LoginSignup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const initialTabIndex = urlParams.get("tab")
    ? ["login", "signup"].indexOf(urlParams.get("tab"))
    : 0;

  const [value, setValue] = useState(initialTabIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const tabValue = newValue === 0 ? "login" : newValue === 1 ? "signup" : "";
    urlParams.set("tab", tabValue);
    navigate(`${location.pathname}?${urlParams.toString()}`, { replace: true });
  };

  useEffect(() => {
    if (!urlParams.has("tab")) {
      urlParams.set("tab", "login");
      navigate(`${location.pathname}?${urlParams.toString()}`, {
        replace: true,
      });
    } else {
      const tabValue = urlParams.get("tab");
      const initialTabIndex = ["login", "signup"].indexOf(tabValue);
      setValue(initialTabIndex >= 0 ? initialTabIndex : 0);
    }
  }, [navigate, location.pathname, urlParams]);

  return (
    <>
      <Grid container sx={{ height: "90vh" }}>
        <Grid
          item
          lg={7}
          sm={5}
          sx={{
            backgroundImage: `url(${loginImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", sm: "block" },
          }}
        ></Grid>
        <Grid item lg={5} sm={7} sx={{}}>
          <Card sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ mx: 3, height: 530 }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs
                  value={value}
                  textColor="secondary"
                  indicatorColor="secondary"
                  onChange={handleChange}
                >
                  <Tab
                    label="Login"
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  ></Tab>
                  <Tab
                    label="Signup"
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  ></Tab>
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Login />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Signup />
              </TabPanel>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginSignup;
