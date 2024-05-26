import React, { useState } from "react";
import DashboardLayout from "MainWidgets/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import T from "context/languageProvider";
import { useMaterialUIController } from "context";
import { Grid } from "@mui/material";
import * as utils from "services/utils";
import MDButton from "components/MDButton";
import DASHGridServiceContainer from "components/DASHGridServiceContainer";
import useNotification from "hooks/NotificationHook";
import DASHActionRow from "../../../components/DASHActionRow";

import Datatable from "../../../components/common/DataTable";
import { RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Orders() {
  const noti = useNotification();
  const [controller] = useMaterialUIController();
  const addNewProductTitle = T("addNewProduct");
  const searchProductTitle = T("search");
  const [windowTitle, setWindowTitle] = useState(addNewProductTitle);
  const [newObjectVisible, setNewObjectVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const [gridRef] = useState(React.createRef);
  const initialSearch = { Grade_Name: null, Country_ID: null };
  const [filter, setFilter] = useState(initialSearch);
  const [method, setMethod] = useState("crud");
  const nav = useNavigate();
  const [isAddFormOpen, setAddFormOpen] = useState(false);

  const startEdite = (e) => {
    console.log(e, "se");
    setCurrentItem(e.row);
    setMethod("crud");
    setAddFormOpen(true);
  };
  const prodDelete = T("prodDelete");
  const prodDeleted = T("prodDeleted");
  const prodDeletedError = T("prodDeletedError");
  const cantReturn = T("cantReturn");
  const startDelete = (e) => {
    noti.DASHAlert(
      async () => {
        const data = await utils.default_post(
          "/api/products/delete/" + e.id,
          {}
        );
        //console.log("data delete", data);
        if (data.success) {
          noti.success(prodDeleted);
          gridRef.current.Refresh();
        } else {
          noti.error(prodDeletedError);
        }
      },
      null,
      null,
      {
        icon: "warning",
        title: `${prodDelete} (${e.name})`,
        html: cantReturn,
      }
    );
  };

  const startChangeStatus = (e) => {};
  // const onClose = () => {
  //   gridRef.current.Refresh();
  //   setNewObjectVisible(false);
  // };

  const handleSearch = (formState) => {
    //console.log("handleSearch", formState);
    setFilter(formState);
    gridRef.current.Refresh();
    setNewObjectVisible(false);
  };

  const changeFilter = (formState) => {
    setFilter((p) => ({ ...p, ...formState }));
    gridRef.current.Refresh();
  };
  const openSearch = (formState) => {
    setMethod("search");
    setWindowTitle(searchProductTitle);
    setNewObjectVisible(true);
  };

  const handleAddClick = () => {
    setAddFormOpen(true);
  };

  const handleCloseForm = () => {
    setAddFormOpen(false);
  };
  const getAvailabilityCellStyle = (params) => {
    console.log(params, "herree");
    const backgroundColor =
      params.row.remaining_qty > 0 ? "rgb(109, 217, 45)" : "rgb(252, 72, 52)";
    return {
      backgroundColor,
      color: "white",
      padding: "8px",
    };
  };

  const productColumns = [
    { field: "id", headerName: "id", width: 70 },

    {
      field: "name",
      headerName: `${T("name")}`,
      width: 230,
    },

    {
      field: "email",
      headerName: `${T("email")}`,
      width: 300,
    },
    {
      field: "created_at",
      headerName: `${T("Creation Date")}`,
      width: 300,
      valueGetter: (v, r) => v.row.created_at.substring(0, 10),
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
          <MDBox
            mr={1}
            key={"view"}
            onClick={(e) => nav("/OrderView/" + params.id)}
          >
            <RemoveRedEye
              fontSize="medium"
              onClick={() => console.log(params)}
              mx={10}
              color="info"
            />
          </MDBox>
        </>
      ),
    },
  ];
  return (
    <div dir={controller.direction}>
      <DashboardLayout>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <DASHGridServiceContainer
                ref={gridRef}
                title="products"
                colmuns={productColumns}
                actionColumns={actionColumn}
                action={
                  <DASHActionRow
                    changeFilter={changeFilter}
                    openSearch={openSearch}
                    filter={filter}
                  ></DASHActionRow>
                }
              >
                <Datatable
                  serviceUrl={"get_admin_orders"}
                  serviceFilter={{}}
                  columns={productColumns}
                  actionColumns={actionColumn}
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

export default Orders;
