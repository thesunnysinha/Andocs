import React, { useEffect, useMemo, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileDetail from "./ProfileDetail";
import Address from "../Address/Address";
import Orders from "../Orders/Orders";

const TabPanel = ({ value, index }) => {
  const tabContent = [<ProfileDetail />, <Address />, <Orders />];

  return (
    <Box role="tabpanel" hidden={value !== index}>
      {value === index && tabContent[index]}
    </Box>
  );
};

const ProfileTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const initialTabIndex = urlParams.get("tab")
    ? ["profile", "address", "orders"].indexOf(urlParams.get("tab"))
    : 0;

  const [value, setValue] = useState(initialTabIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const tabValue =
      newValue === 0 ? "profile" : newValue === 1 ? "address" : "orders";
    urlParams.set("tab", tabValue);
    navigate(`${location.pathname}?${urlParams.toString()}`, { replace: true });
  };

  useEffect(() => {
    if (!urlParams.has("tab")) {
      urlParams.set("tab", "profile");
      navigate(`${location.pathname}?${urlParams.toString()}`, {
        replace: true,
      });
    } else {
      const tabValue = urlParams.get("tab");
      const initialTabIndex = ["profile", "address", "orders"].indexOf(
        tabValue
      );
      setValue(initialTabIndex >= 0 ? initialTabIndex : 0);
    }
  }, [navigate, location.pathname, urlParams]);

  return (
    <>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Profile" />
        <Tab label="Address" />
        <Tab label="Orders" />
      </Tabs>
      <TabPanel value={value} index={0} />
      <TabPanel value={value} index={1} />
      <TabPanel value={value} index={2} />
    </>
  );
};

export default ProfileTabs;
