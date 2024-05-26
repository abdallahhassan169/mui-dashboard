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
    // {
    //   field: "edit",
    //   headerName: `${T("edit")}`,
    //   width: 100,
    //   filterable: false,
    //   sortable: false,
    //   renderCell: (params) => (
    //     <div className="cellAction">
    //       <div className="editeButton" onClick={startEdite}>
    //         {T("edit")}
    //       </div>
    //     </div>
    //   ),
    // },
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
