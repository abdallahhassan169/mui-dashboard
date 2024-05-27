import React, { useState } from "react";
import DashboardLayout from "MainWidgets/LayoutContainers/DashboardLayout";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import T from "context/languageProvider";
import { Grid } from "@mui/material";
import * as utils from "services/utils";
import DASHGridServiceContainer from "components/DASHGridServiceContainer";
import useNotification from "hooks/NotificationHook";
import MDButton from "components/MDButton";
import DASHActionRow from "../../../components/DASHActionRow";
import Datatable from "../../../components/common/DataTable";
import NewUserForm from "./NewUserForm";
import { AddTask, ResetTv } from "@mui/icons-material";
import DeleteForever from "@mui/icons-material/DeleteForever";

function Users() {
  const noti = useNotification();
  const [controller] = useMaterialUIController();
  const addUserTitle = T("users");
  const searchTitle = T("search");
  const [windowTitle, setWindowTitle] = useState(addUserTitle);
  const [newObjectVisible, setNewObjectVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const [gridRef] = useState(React.createRef);
  const initialSearch = { Country_Name: null };
  const [filter, setFilter] = useState(initialSearch);
  const [method, setMethod] = useState("crud");

  const [isAddFormOpen, setAddFormOpen] = useState(false);

  const startEdite = (e) => {
    setCurrentItem(e);
    setAddFormOpen(true);
  };

  const changeFilter = (formState) => {
    setFilter((p) => ({ ...p, ...formState }));
    gridRef.current.Refresh();
  };
  const openSearch = (formState) => {
    setMethod("search");
    setWindowTitle(searchTitle);
    setNewObjectVisible(true);
  };

  const handleAddClick = () => {
    setCurrentItem(null);
    setAddFormOpen(true);
  };

  const handleCloseForm = () => {
    setAddFormOpen(false);
  };
  const startDelete = (row) => {
    noti.DASHAlert(
      async () => {
        const data = await utils.default_post("toggle_admin_status", {
          id: row.id,
        });
        if (data.success) {
          gridRef.current.refresh();
          noti.success(" تم تعطيل المستخدم");
        } else {
          noti.error("خطأ في تعطيل/تفعيل المستخدم ");
        }
      },
      () => {},
      null,
      {
        icon: "warning",
        title: `${"هل انت متاكد من تعطيل / تفعيل المستخدم"} (${row?.name})`,
        //html: cantReturn,
      }
    );
  };
  const resetPassword = (row) => {
    console.log(row);
    noti.DASHAlert(
      async () => {
        const data = await utils.default_post("resetPassword", {
          id: row.id,
        });
        if (data.success) {
          gridRef.current.refresh();
          noti.DASHAlert(null, null, null, {
            icon: "warning",
            title: `"كلمة المرور الجديدة هي ${data.data.new_password}"  (${row?.name})`,
            //html: cantReturn,
          });
          noti.success(" تم تغيير كلمة مرور المستخدم");
        } else {
          noti.error("خطأ في تغيير كلمة المرور   ");
        }
      },
      null,
      null,
      {
        icon: "warning",
        title: `${"هل انت متاكد من تغيير كلمة المرور للمستخدم"} (${row?.name})`,
        //html: cantReturn,
      }
    );
  };
  const usersColmuns = [
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
      field: "mobile_no",
      headerName: `${T("Phone")}`,
      width: 300,
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
            {params.row.is_active ? (
              <DeleteForever
                fontSize="medium"
                onClick={() => startDelete(params.row)}
                mx={10}
                color="error"
              ></DeleteForever>
            ) : (
              <AddTask
                fontSize="medium"
                onClick={() => startDelete(params.row)}
                mx={10}
                color="success"
              ></AddTask>
            )}
          </MDBox>

          <MDBox mr={1} key={"active"}>
            <ResetTv
              fontSize="medium"
              onClick={() => resetPassword(params.row)}
              mx={10}
              color="error"
            ></ResetTv>
          </MDBox>
        </>
      ),
    },
  ];

  return (
    <div dir={controller.direction}>
      <DashboardLayout>
        <MDBox pt={6} pb={3}>
          <Grid resizable={true} container spacing={6}>
            <Grid item xs={12}>
              <DASHGridServiceContainer
                ref={gridRef}
                title="users"
                serviceUrl={"/user"}
                serviceFilter={filter}
                action={
                  <DASHActionRow
                    changeFilter={changeFilter}
                    openSearch={openSearch}
                    filter={filter}
                  >
                    <MDButton onClick={handleAddClick} color={"dark"}>
                      {T("AddNewUser")}
                    </MDButton>
                  </DASHActionRow>
                }
              >
                <Datatable
                  serviceUrl={"get_admins"}
                  serviceFilter={{}}
                  columns={usersColmuns}
                  actionColumns={actionColumn}
                  pageSize={10}
                  checkBox={true}
                  ref={gridRef}
                />
              </DASHGridServiceContainer>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>

      <NewUserForm
        open={isAddFormOpen}
        initialValue={currentItem}
        onClose={handleCloseForm}
      />
    </div>
  );
}

export default Users;
