import React from "react";
import MDBox from "./MDBox";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import MDTypography from "./MDTypography";

function DASHFilterItem(props) {
  const { filterName ,onClick} = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "10px",
        width: "fit-content",
        padding: "5px", 
        borderRadius: "4px",
        color: "rgba(0, 0, 0, 0.87)", 
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
      }}
    >
      <MDTypography mr={1} variant="h6">
        {filterName}
      </MDTypography>
      <CloseIcon fontSize="medium" cursor="pointer" color="dark" onClick={onClick}></CloseIcon>
    </div> 
  );
}

export default DASHFilterItem;
