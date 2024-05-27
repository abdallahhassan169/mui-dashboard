import ImagesCarousel from "../../../components/ImagesCarousel";
import { default_post } from "../../../services/utils";
import { useState, useEffect } from "react";

import React from "react";
import DashboardLayout from "MainWidgets/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import T from "context/languageProvider";
import { Grid } from "@mui/material";

import * as utils from "services/utils";
import MDButton from "components/MDButton";
import DASHGridServiceContainer from "components/DASHGridServiceContainer";

import DASHActionRow from "components/DASHActionRow";

import Datatable from "../../../components/common/DataTable";
import AppSliderForm from "./SliderForm";

export default function AppSlider() {
  const [data, setData] = React.useState([]);
  const [isAddFormOpen, setAddFormOpen] = useState(false);

  const [currentItem, setCurrentItem] = useState();
  const [gridRef] = useState(React.createRef);
  const initialSearch = { Subject_Name: null, Grad_ID: null };
  const [filter, setFilter] = useState(initialSearch);
  const [method, setMethod] = useState("crud");
  const startEdite = (e) => {
    setCurrentItem(e);
    setMethod("crud");
    setAddFormOpen(true);
  };

  const changeFilter = (formState) => {
    setFilter((p) => ({ ...p, ...formState }));
    gridRef.current.Refresh();
  };
  const openSearch = (formState) => {
    setCurrentItem(filter);
    setMethod("search");
    setAddFormOpen(true);
  };

  const handleAddClick = () => {
    setCurrentItem({});
    setMethod("crud");
    setAddFormOpen(true);
  };
  const handleCloseForm = () => {
    setAddFormOpen(false);
    getData();
  };
  const getStatusCellStyle = (params) => {
    const backgroundColor = params.value
      ? "rgb(109, 217, 45)"
      : "rgb(252, 72, 52)";
    return {
      backgroundColor,
      color: "white",
      padding: "8px",
    };
  };
  const getData = () => {
    default_post("banners").then((res) =>
      setData(res.data.rows[0].full_data.slides)
    );
  };
  React.useEffect(() => {
    getData();
    //setData(res.data?.data?.rows?.full_data?.slides)
  }, []);
  return (
    <>
      <DashboardLayout>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <DASHGridServiceContainer
                title="المسابقات"
                serviceUrl={"/api/categories/getCats"}
                serviceFilter={filter}
                action={
                  <DASHActionRow
                    changeFilter={changeFilter}
                    openSearch={openSearch}
                    filter={filter}
                  >
                    <MDButton onClick={handleAddClick} color={"dark"}>
                      {T("Add New Images")}
                    </MDButton>
                  </DASHActionRow>
                }
              >
                <ImagesCarousel items={data} imageKey={"url"} />
              </DASHGridServiceContainer>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
      <AppSliderForm
        open={isAddFormOpen}
        initialValue={currentItem}
        onClose={handleCloseForm}
        method={method}
      />
    </>
  );
}
