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
import ProductForm from "./ProducForm";
import Datatable from "../../../components/common/DataTable";
import EditIcon from "@mui/icons-material/Edit";

function Products() {
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
    gridRef.current.refresh();
  };
  const getAvailabilityCellStyle = (params) => {
    console.log(params.row.remaining_qty > 0, "herree");
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
      field: "egp_price",
      headerName: `${T("price")}`,
      width: 100,
    },
    {
      field: "remaining_qty",
      headerName: `${T("الكمية المتبقية")}`,
      width: 130,
    },
    {
      field: "availability",
      headerName: `${T("availability")}`,
      width: 150,
      renderCell: (params) => {
        console.log(params);
        return (
          <div style={getAvailabilityCellStyle(params)}>
            {params.row.remaining_qty > 0
              ? `${T("active")}`
              : `${T("inactive")}`}
          </div>
        );
      },
    },
  ];
  const actionColumn = [
    {
      field: "edit",
      headerName: `${T("edit")}`,
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div className="cellAction">
          <MDBox mr={1} key={"edite"}>
            <EditIcon
              fontSize="medium"
              color="dark"
              onClick={() => startEdite(params.row)}
            ></EditIcon>
          </MDBox>
        </div>
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
                title="products"
                colmuns={productColumns}
                actionColumns={actionColumn}
                action={
                  <DASHActionRow
                    changeFilter={changeFilter}
                    openSearch={openSearch}
                    filter={filter}
                  >
                    <MDButton onClick={handleAddClick} color={"dark"}>
                      {addNewProductTitle}
                    </MDButton>
                  </DASHActionRow>
                }
              >
                <Datatable
                  ref={gridRef}
                  serviceUrl={"get_products"}
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

      <ProductForm
        open={isAddFormOpen}
        initialValue={currentItem}
        onClose={handleCloseForm}
      />
    </div>
  );
}

export default Products;
