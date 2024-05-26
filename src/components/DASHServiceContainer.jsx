import { Card, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MDBox from "./MDBox";
import MDTypography from "./MDTypography";
import T from "context/languageProvider"; 

export const DASHServiceContainer  = React.forwardRef((props,ref)=> {
  const { serviceUrl,serviceFilter, title, action  } = props;

  return (
    <Grid item xs={12}>
      <Card>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">
            {T(title)}
          </MDTypography>
        </MDBox>
        {action && 
          {...action}
        }
        <MDBox pt={action?0:3} my={2} mx={2}> 
        <Grid container spacing={3}>   {props.children}
        </Grid>
        </MDBox>
      </Card>
    </Grid>
  );
})
