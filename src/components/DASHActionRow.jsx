import { Grid } from "@mui/material";
import React from "react";
import MDBox from "./MDBox";
import SearchIcon from "@mui/icons-material/Search";
import T from "context/languageProvider";
import DASHFilterItem from "./DASHFilterItem";

function DASHActionRow(props) {
  const { changeFilter, openSearch, filter } = props;  

  const tifOptions = Object.keys(filter).map(key => 
    filter[key]&& <DASHFilterItem
        key={T(key)}  
        onClick={() => {
          changeFilter({  [key]: null });
        }}
        filterName={`${T(key)} : ${filter[key]}`}
      />
)  
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      px={3}
      mt={2}
    >
      <Grid item xs={3}>
        {props.children}
      </Grid>
      <Grid alignItems="center" item>
        <MDBox>
          <SearchIcon
            fontSize="medium"
            cursor="pointer"
            color="dark"
            onClick={openSearch}
          ></SearchIcon>
        </MDBox>
      </Grid>
      <Grid mt={1} item xs={12}>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
            {tifOptions}
          
        </div>
      </Grid>
    </Grid>
  );
}

export default DASHActionRow;
