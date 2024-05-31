import ImagesCarousel from "../../../components/ImagesCarousel";
import { default_post } from "../../../services/utils";
import { useState, useEffect } from "react";

import React from "react";
import DashboardLayout from "MainWidgets/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import T from "context/languageProvider";
import { Grid } from "@mui/material";
import useNotification from "hooks/NotificationHook";

import * as utils from "services/utils";
import MDButton from "components/MDButton";
import DASHGridServiceContainer from "components/DASHGridServiceContainer";

import DASHActionRow from "components/DASHActionRow";

import Datatable from "../../../components/common/DataTable";
import AppSliderForm from "./SliderForm";
import { DeleteForever } from "@mui/icons-material";
import { config } from "../../../config/constants";

export default function AppSlider() {
  const [data, setData] = React.useState([]);
  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const [type, setType] = useState();
  const [currentItem, setCurrentItem] = useState();
  const [gridRef] = useState(React.createRef);
  const initialSearch = { Subject_Name: null, Grad_ID: null };
  const [filter, setFilter] = useState(initialSearch);
  const noti = useNotification();

  const [method, setMethod] = useState("crud");

  const changeFilter = (formState) => {
    setFilter((p) => ({ ...p, ...formState }));
    gridRef.current.Refresh();
  };
  const openSearch = (formState) => {
    setCurrentItem(filter);
    setMethod("search");
    setAddFormOpen(true);
  };

  const handleAddClick = (type) => {
    console.log(type);
    setCurrentItem({});
    setType(type);
    setMethod("crud");
    setAddFormOpen(true);
  };
  const handleCloseForm = () => {
    setAddFormOpen(false);
    gridRef.current.refresh();
  };
  const startDelete = (row) => {
    noti.DASHAlert(
      async () => {
        const data = await utils.default_post("delete_asset", {
          id: row.id,
        });
        if (data.success) {
          gridRef.current.refresh();
          noti.success("حذف الورة");
        } else {
          noti.error("خطأ في حذف الصورة ");
        }
      },
      null,
      null,
      {
        icon: "warning",
        title: `${"هل انت متاكد من حذف الصورة "} (${row?.id})`,
        //html: cantReturn,
      }
    );
  };
  const columns = [
    { field: "id", headerName: `${T("ID")}`, width: 250 },
    {
      field: "type",
      headerName: `${T("النوع")}`,
      width: 250,
    },
    {
      field: "imagecell",
      headerName: `${T("Image")}`,
      width: 250,
      renderCell: (params) => (
        <img
          src={`${config.backend.url}image?img=${params.row?.banner}`}
          style={{ width: 50, height: 50 }}
        />
      ),
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: `${T("action")}`,
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <>
          <MDBox mr={1} key={"delete"}>
            <DeleteForever
              fontSize="medium"
              onClick={() => startDelete(params.row)}
              mx={10}
              color="error"
            ></DeleteForever>
          </MDBox>
        </>
      ),
    },
  ];
  return (
    <>
      <DashboardLayout>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <DASHGridServiceContainer
                title="عارض الصور"
                serviceUrl={"/api/categories/getCats"}
                serviceFilter={filter}
                action={
                  <DASHActionRow
                    changeFilter={changeFilter}
                    openSearch={openSearch}
                    filter={filter}
                  >
                    <MDButton
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleAddClick("slides")}
                      color={"success"}
                    >
                      {T("Add New Slides")}
                    </MDButton>
                    <MDButton
                      onClick={() => handleAddClick("banners")}
                      color={"dark"}
                    >
                      {T("Add New Banners")}
                    </MDButton>
                  </DASHActionRow>
                }
              >
                <Datatable
                  ref={gridRef}
                  serviceUrl={"dash_banners"}
                  serviceFilter={{}}
                  columns={columns}
                  actionColumns={actionColumn}
                  pageSize={10}
                  checkBox={true}
                />
              </DASHGridServiceContainer>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
      <AppSliderForm
        open={isAddFormOpen}
        initialValue={currentItem}
        onClose={handleCloseForm}
        type={type}
        method={method}
      />
    </>
  );
}
