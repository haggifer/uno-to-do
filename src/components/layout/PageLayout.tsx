import React, {Suspense} from 'react';
import {Sidebar} from "./Sidebar";
import {Outlet} from "react-router";
import {Box} from "@mui/material";
import {CenteredLoader} from "../common/CenteredLoader";

const PageLayout = (): JSX.Element => {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
    }}>
      <Suspense fallback={<CenteredLoader/>}>
        <Sidebar/>
      </Suspense>

      <Suspense fallback={<CenteredLoader/>}>
        <Outlet/>
      </Suspense>
    </Box>
  );
}

export default PageLayout;
