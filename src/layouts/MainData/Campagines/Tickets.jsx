import React, { useState } from "react";
import DashboardLayout from "MainWidgets/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import T from "context/languageProvider";
import { Grid } from "@mui/material";

import { AddTask, RemoveRedEye } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FlashOffIcon from "@mui/icons-material/FlashOff";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import * as utils from "services/utils";
import MDButton from "components/MDButton";
import DASHGridServiceContainer from "components/DASHGridServiceContainer";
import useNotification from "hooks/NotificationHook";
import DASHActionRow from "components/DASHActionRow";
import CampaginesForm from "./CampaginesForm";
import Datatable from "../../../components/common/DataTable";
import { default_post } from "../../../services/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { GridToolbar } from "@mui/x-data-grid";
function Tickets() {
  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const { state } = useLocation();
  console.log(state, "dhuebfuke");
  const noti = useNotification();
  const [controller] = useMaterialUIController();

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
    gridRef.current.refresh();
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

  const columns = [
    { field: "id", headerName: `${T("ID")}`, width: 25 },
    {
      field: "campaign_id",
      headerName: `${T("Campaign ID")}`,
      width: 150,
    },

    {
      field: "created_at",
      headerName: `${T("Created At")}`,
      width: 200,
      valueGetter: (params) => params.row?.created_at?.substring(0, 10),
    },
    {
      field: "is_winner",
      headerName: `${T("Winner Status")}`,
      width: 200,
      valueGetter: (params) => (params.row?.is_winner ? "  الفائز" : ""),
    },
    {
      field: "phone",
      headerName: `${T("User Phone")}`,
      width: 200,
    },
    {
      field: "order_id",
      headerName: `${T("Order ID")}`,
      width: 150,
    },
    {
      field: "product_id",
      headerName: `${T("Product ID")}`,
      width: 150,
    },
  ];

  {
    /* <Progress color="info" value={60} /> */
  }

  const actionColumn = [];

  return (
    <div dir={controller.direction}>
      <DashboardLayout>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <DASHGridServiceContainer
                title="Tickets"
                serviceUrl={"/api/categories/getCats"}
                serviceFilter={filter}
                action={
                  <DASHActionRow
                    changeFilter={changeFilter}
                    openSearch={openSearch}
                    filter={filter}
                  ></DASHActionRow>
                }
              >
                <Datatable
                  ref={gridRef}
                  serviceUrl={"get_campaign_tickets"}
                  serviceFilter={{ id: state.cam_id }}
                  columns={columns}
                  actionColumns={actionColumn}
                  slots={{ toolbar: GridToolbar }}
                  pageSize={10}
                  checkBox={true}
                />
              </DASHGridServiceContainer>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </div>
  );
}

export default Tickets;
