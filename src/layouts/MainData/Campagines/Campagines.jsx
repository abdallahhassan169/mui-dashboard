import React, { useState } from "react";
import DashboardLayout from "MainWidgets/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import T from "context/languageProvider";
import { Button, Grid } from "@mui/material";

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
import { useNavigate } from "react-router-dom";
function Campagines() {
  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const noti = useNotification();
  const [controller] = useMaterialUIController();
  const addCategoriesTitle = T("AddNewCategoury");
  const searchTitle = T("search");
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
  const catDeleted = T("catDeleted");
  const catDeletedError = T("catDeletedError");
  const catDelete = T("catDelete");
  const cantReturn = T("cantReturn");
  const catStatusDone = T("catStatusDone");
  const catStatusError = T("catStatusError");
  const catStatus = T("catStatus");
  const [data, setData] = React.useState([]);
  const nav = useNavigate();
  React.useEffect(() => {
    default_post("get_admin_campaigns").then((res) => setData(res.data));
  }, []);
  const startDelete = (row) => {
    noti.DASHAlert(
      async () => {
        const data = await utils.default_post("delete_campaign", {
          id: row.id,
        });
        if (data.success) {
          gridRef.current.refresh();
          noti.success("  تعطيل / تفعيل المسابقة");
        } else {
          noti.error("خطأ في تعطيل/تفعيل المسابقة ");
        }
      },
      null,
      null,
      {
        icon: "warning",
        title: `${"هل انت متاكد من تعطيل / تفعيل المسابقة"} (${row?.name})`,
        //html: cantReturn,
      }
    );
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
      field: "name",
      headerName: `${T("Name")}`,
      width: 400,
      cellClassName: "font-weight-bold",
    },
    {
      field: "winner",
      headerName: `${T("حالة الفوز ")}`,
      width: 200,
      valueGetter: (params) =>
        params.row?.winner !== null ? "تم تحديد الفائز" : "لم يتم تحديد الفائز",
    },
    {
      field: "start_date",
      headerName: `${T("Start Date")}`,
      valueGetter: (params) => params.row?.start_date?.substring(0, 10),
    },
    {
      field: "draw_date",
      headerName: `${T("Draw Date")}`,
      valueGetter: (params) => params.row?.draw_date?.substring(0, 10),
    },
    {
      field: "is_deactivated",
      headerName: `${T("الحالة")}`,
      valueGetter: (params) => (params.row?.is_deactivated ? "معطلة" : "فعالة"),
    },
    { field: "product", headerName: `${T("Product")}`, width: 150 },
    {
      field: "target",
      headerName: `${T("Target")}`,
    },
    {
      field: "ticket",
      headerName: `${T("Tickets")}`,
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <>
          <MDBox
            mr={1}
            key={"edite"}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={() => {
                nav("/tickets", { state: { cam_id: params.row.id } });
              }}
            >
              Tickets
            </Button>
          </MDBox>
        </>
      ),
    },
  ];
  {
    /* <Progress color="info" value={60} /> */
  }

  const actionColumn = [
    {
      field: "action",
      headerName: `${T("action")}`,
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <>
          <MDBox mr={1} key={"edite"}>
            <EditIcon
              fontSize="medium"
              color="dark"
              onClick={() => startEdite(params.row)}
            ></EditIcon>
          </MDBox>
          {params.row.remaining_qty == params.row.target ? (
            <MDBox mr={1} key={"delete"}>
              {params.row.is_deactivated ? (
                <AddTask
                  fontSize="medium"
                  onClick={() => startDelete(params.row)}
                  mx={10}
                  color="success"
                ></AddTask>
              ) : (
                <DeleteForeverIcon
                  fontSize="medium"
                  onClick={() => startDelete(params.row)}
                  mx={10}
                  color="error"
                ></DeleteForeverIcon>
              )}
            </MDBox>
          ) : (
            ""
          )}
          <MDBox
            mr={1}
            key={"view"}
            onClick={(e) => nav("/CampaginesView/" + params.id)}
          >
            <RemoveRedEye
              fontSize="medium"
              onClick={() => console.log(params)}
              mx={10}
              color="info"
            />
          </MDBox>
          <MDBox mr={1} key={"active"}>
            {params.is_deactivated ? (
              <FlashOffIcon
                fontSize="medium"
                onClick={() =>
                  noti.DASHAlert(
                    async () => {
                      //console.log(params.row);
                    },
                    null,
                    null,
                    {
                      icon: "warning",
                      title: ` prodDelete} ( {e.name})`,
                      html: cantReturn,
                    }
                  )
                }
                mx={10}
                color="error"
              ></FlashOffIcon>
            ) : null}
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
                      {T("Add New Campaign")}
                    </MDButton>
                  </DASHActionRow>
                }
              >
                <Datatable
                  ref={gridRef}
                  serviceUrl={"get_admin_campaigns"}
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

      <CampaginesForm
        open={isAddFormOpen}
        initialValue={currentItem}
        onClose={handleCloseForm}
        method={method}
      />
    </div>
  );
}

export default Campagines;
