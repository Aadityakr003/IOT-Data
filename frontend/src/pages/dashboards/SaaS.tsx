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

interface IotData {
  id?: any | null;
  location: string;
  temperature: string;
  data: string;
  time: string;
}

const SaaS = () => {
  // change navbar title
  useTitle("Tracking Dashboard");

  const theme = useTheme();
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
    axios.get(baseURL).then((response) => {
      console.log("responeded11111 : ");

      // const iot: IotData = {
      //   id:response.data ,
      //   location: "Josh",
      //   temperature: "",
      //   data:,
      //   time:

      // };
    });
  }, []);

  const test = async () => {
    let response = await fetch(baseURL);
    const details = await response.json();
    const latestData = await details[details.length - 1];
    console.log("latestData", latestData);
  };

  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {cardList.map((card, index) => (
          <Grid item lg={3} xs={6} key={index}>
            <SaaSCard card={card} />
          </Grid>
        ))}
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

        <Grid item xs={12}>
          {/* <Footer imageLink="/static/illustration/sass-dashboard.svg" /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SaaS;
