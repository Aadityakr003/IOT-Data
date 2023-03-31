import { Box, Grid, useTheme } from "@mui/material";
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
import React, { useEffect, useState } from "react";
import axios from "axios";

import { FC } from "react";

const SaaS = () => {
  const theme = useTheme();
  const [location, setLocation] = React.useState({
    price: "",
    Icon: BucketIcon,
    title: "Location",
    color: theme.palette.primary.main,
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
    title: "Date",
    color: theme.palette.primary.red,
  });
  const [time, setTime] = React.useState({
    price: "",
    Icon: PeopleIcon,
    title: "Time",
    color: theme.palette.primary.yellow,
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
      title: "Temperature",
      Icon: EarningIcon,
      color: theme.palette.primary.purple,
    },
    {
      price: 684,
      Icon: WindowsLogoIcon,
      title: "Date",
      color: theme.palette.primary.red,
    },
    {
      price: 321,
      Icon: PeopleIcon,
      title: "Time",
      color: theme.palette.primary.yellow,
    },
  ];

  React.useEffect(() => {
    test();
    axios.get(baseURL).then((response) => {});
  }, []);

  const test = async () => {
    let response = await fetch(baseURL);
    const details = await response.json();
    const latestData = await details[details.length - 1];
    console.log("latestData", latestData);
    setLocation({ ...location, price: latestData?.location });
    setTemp({ ...temp, price: latestData?.temperature });
    setDate({ ...date, price: latestData?.date });
    setTime({ ...time, price: latestData?.time });
  };

  // const intervalId = setInterval(() => {
  //   test();
  //   console.log("..................................................");
  // }, 600000);

  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {/* {cardList.map((card, index) => ( */}
        <Grid item lg={3} xs={6}>
          <SaaSCard card={location} />
        </Grid>
        <Grid item lg={3} xs={6}>
          <SaaSCard card={temp} />
        </Grid>
        <Grid item lg={3} xs={6}>
          <SaaSCard card={date} />
        </Grid>
        <Grid item lg={3} xs={6}>
          <SaaSCard card={time} />
        </Grid>
        {/* ))} */}
      </Grid>

      <Grid container spacing={4} pt={4}>
        <Grid item lg={8} md={7} xs={12}>
          <TotalSpent />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <Analytics />
        </Grid>

        <Grid item lg={8} md={7} xs={12}>
          <RecentOrders />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <TopSelling />
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
};

export default SaaS;