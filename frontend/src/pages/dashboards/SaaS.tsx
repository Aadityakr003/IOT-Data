import { Box, Button, Grid, useTheme } from "@mui/material";
import Analytics from "components/Dashboards/saas/Analytics";
import SaaSCard from "components/Dashboards/saas/Card";
// import Footer from "components/Dashboards/saas/Footer";
import RecentOrders from "components/Dashboards/saas/RecentOrders";
import TopSelling from "components/Dashboards/saas/TopSelling";
import TotalSpent from "components/Dashboards/saas/TotalSpent";
import useTitle from "hooks/useTitle";
import BucketIcon from "icons/BucketIcon";
import EarningIcon from "icons/EarningIcon";
import PeopleIcon from "icons/PeopleIcon";
import WindowsLogoIcon from "icons/WindowsLogoIcon";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Map from "./Map";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import VibrationIcon from "@mui/icons-material/Vibration";

import { FC } from "react";

const SaaS = () => {
  const theme = useTheme();
  const [location, setLocation] = React.useState({
    price: "",
    Icon: BucketIcon,
    title: "",
    color: theme.palette.primary.main,
  });
  const [humidity, setHumidity] = React.useState({
    price: "",
    title: "Humidity",
    Icon: EarningIcon,
    color: theme.palette.primary.purple,
  });
  const [temp, setTemp] = React.useState({
    price: "",
    title: "Temperature",
    Icon: EarningIcon,
    color: theme.palette.primary.purple,
  });
  const [date, setDate] = React.useState({
    price: "",
    Icon: WindowsLogoIcon,
    title: "Date & Time",
    color: theme.palette.primary.main,
  });
  const [light, setLight] = React.useState({
    price: "",
    Icon: WbTwilightIcon,
    title: "Light",
    color: theme.palette.primary.red,
  });
  const [vibration, setVibration] = React.useState({
    price: "",
    Icon: VibrationIcon,
    title: "Vibration",
    color: theme.palette.primary.red,
  });

  // change navbar title
  useTitle("Tracking Dashboard");

  const baseURL = "http://localhost:3000/getAllTemp";

  const cardList = [
    {
      price: 574,
      Icon: BucketIcon,
      title: "Location",
      color: theme.palette.primary.main,
    },
    {
      price: 521,
      title: "Humidity",
      Icon: EarningIcon,
      color: theme.palette.primary.purple,
    },
    {
      price: 684,
      Icon: WindowsLogoIcon,
      title: "Temperature",
      color: theme.palette.primary.red,
    },
    {
      price: 321,
      Icon: PeopleIcon,
      title: "Date",
      color: theme.palette.primary.yellow,
    },
    {
      price: 321,
      Icon: PeopleIcon,
      title: "Light",
      color: theme.palette.primary.yellow,
    },
    {
      price: 321,
      Icon: PeopleIcon,
      title: "Vibration",
      color: theme.palette.primary.yellow,
    },
  ];

  useEffect(() => {
    test();

    return () => {};
  }, []);

  const test = async () => {
    let response = await fetch(baseURL);
    console.log("🚀 ~ test ~ response", response);
    const details = await response.json();
    const latestData = await details[details.length - 1];
    console.log("latestData", latestData);
    let _location = "Lat"+latestData?.lat+","+"Long"+latestData?.lng;
    setLocation({ ...location, price: _location });
    setHumidity({ ...humidity, price: latestData?.humidity });
    setTemp({ ...temp, price: latestData?.temperature });
    setDate({ ...date, price: latestData?.date });
    setLight({ ...light, price: latestData?.light });
    setVibration({ ...vibration, price: latestData?.vibration });
  };

  return (
    <>
      <Box pt={2} pb={4}>
        <Grid container columns={13} spacing={{ xs: 2, sm: 3, md: 4 }}>
          {/* {cardList.map((card, index) => ( */}
          <Grid item lg={3} xs={6}>
            <SaaSCard card={location} />
          </Grid>
          <Grid item lg={3} xs={6}>
            <SaaSCard card={humidity} />
          </Grid>
          <Grid item lg={3} xs={6}>
            <SaaSCard card={temp} />
          </Grid>
          <Grid item lg={3} xs={6}>
            <SaaSCard card={date} />
          </Grid>
          <Grid item lg={1} xs={1} sx={{ cursor: "pointer" }} onClick={test}>
            <RefreshIcon sx={{ color: "blue" }} />
          </Grid>
          <Grid item lg={3} xs={6}>
            <SaaSCard card={light} />
          </Grid>
          <Grid item lg={3} xs={6}>
            <SaaSCard card={vibration} />
          </Grid>
          {/* ))} */}
        </Grid>

        <Grid container spacing={2} pt={2}>
          <Grid item lg={8} md={5} xs={4}>
            <Map />
          </Grid>
          <Grid item lg={4} md={5} xs={12}>
            {/* <Analytics /> */}
          </Grid>

          <Grid item lg={8} md={7} xs={12}>
            {/* <RecentOrders /> */}
          </Grid>
          <Grid item lg={4} md={5} xs={12}>
            {/* <TopSelling /> */}
          </Grid>

          <Grid item xs={12}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SaaS;
