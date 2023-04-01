import { Box, Button, Grid, useTheme } from '@mui/material';
import Analytics from 'components/Dashboards/saas/Analytics';
import SaaSCard from 'components/Dashboards/saas/Card';
// import Footer from "components/Dashboards/saas/Footer";
import RecentOrders from 'components/Dashboards/saas/RecentOrders';
import TopSelling from 'components/Dashboards/saas/TopSelling';
import TotalSpent from 'components/Dashboards/saas/TotalSpent';
import useTitle from 'hooks/useTitle';
import BucketIcon from 'icons/BucketIcon';
import EarningIcon from 'icons/EarningIcon';
import PeopleIcon from 'icons/PeopleIcon';
import WindowsLogoIcon from 'icons/WindowsLogoIcon';
import RefreshIcon from '@mui/icons-material/Refresh';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';


import { FC } from 'react';

const SaaS = () => {
  const theme = useTheme();
  const [location, setLocation] = React.useState({
    price: '',
    Icon: BucketIcon,
    title: 'Location',
    color: theme.palette.primary.main,
  });
  const [humidity, setHumidity] = React.useState({
    price: '',
    title: 'Humidity',
    Icon: EarningIcon,
    color: theme.palette.primary.purple,
  });
  const [temp, setTemp] = React.useState({
    price: '',
    title: 'Temperature',
    Icon: EarningIcon,
    color: theme.palette.primary.purple,
  });
  const [date, setDate] = React.useState({
    price: '',
    Icon: WindowsLogoIcon,
    title: 'Date',
    color: theme.palette.primary.red,
  });

  // change navbar title
  useTitle('Tracking Dashboard');

  const baseURL = 'http://localhost:3000/getAllTemp';

  const cardList = [
    {
      price: 574,
      Icon: BucketIcon,
      title: 'Location',
      color: theme.palette.primary.main,
    },
    {
      price: 521,
      title: 'Humidity',
      Icon: EarningIcon,
      color: theme.palette.primary.purple,
    },
    {
      price: 684,
      Icon: WindowsLogoIcon,
      title: 'Temperature',
      color: theme.palette.primary.red,
    },
    {
      price: 321,
      Icon: PeopleIcon,
      title: 'Date',
      color: theme.palette.primary.yellow,
    },
  ];

  useEffect(() => {
    test();

    return () => {};
  }, []);

  const test = async () => {
    let response = await fetch(baseURL);
    console.log('🚀 ~ test ~ response', response);
    const details = await response.json();
    const latestData = await details[details.length - 1];
    console.log('latestData', latestData);
    setLocation({ ...location, price: latestData?.location });
    setHumidity({ ...humidity, price: latestData?.humidity });
    setTemp({ ...temp, price: latestData?.temperature });
    setDate({ ...date, price: latestData?.date });
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
          <Grid item lg={1}  xs={1} sx={{cursor:'pointer'}} onClick={test}>
            <RefreshIcon sx={{ color: "blue" }} />
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
    </>
  );
};

export default SaaS;
