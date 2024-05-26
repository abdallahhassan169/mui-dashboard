import { Card, Collapse, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MDBox from "./MDBox";
import MDTypography from "./MDTypography";
import T from "context/languageProvider";
//import { DASHGridService } from "./common/DASHGridService";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
  const DASHGridServiceContainer = React.forwardRef((props, ref) => {
  const {  title, action, collapse} = props;

  const [open, setOpen] = useState(collapse && true);
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
          onClick={() => collapse && setOpen(!open)}
        >
          <Grid container justifyContent={"space-between"}>
            <MDTypography variant="h6" color="white">
              {T(title)}
            </MDTypography>
            {collapse ? (
              open ? (
                <ChevronRightIcon
                  color="white"
                  fontSize="medium"
                ></ChevronRightIcon>
              ) : (
                <KeyboardArrowDownIcon
                  color="white"
                  fontSize="medium"
                ></KeyboardArrowDownIcon>
              )
            ) : (
              <></>
            )}
          </Grid>
        </MDBox>
        <Collapse in={collapse ? open : true} timeout="auto" unmountOnExit>
          {action && { ...action }}
          <MDBox pt={action ? 0 : 3} my={2} mx={2}>

{props.children}
          </MDBox>
        </Collapse>
      </Card>
    </Grid>
  );
});
export default DASHGridServiceContainer;