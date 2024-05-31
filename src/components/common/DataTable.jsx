import "../../themes/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
//import { userColumns, userRows, products } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect, forwardRef } from "react";
import * as utils from "../../services/utils";
import React from "react";
//import Users from "../../pages/users/Users";

const Datatable = forwardRef(
  (
    { serviceUrl, serviceFilter, columns, actionColumns, pageSize, checkBox },
    ref,
    props
  ) => {
    const [data, setData] = useState([]);

    const getData = async () => {
      const data = await utils.default_post(serviceUrl, serviceFilter);
      if (data.success) {
        setData(data.data);
      } else {
      }
    };
    useEffect(() => {
      getData();
    }, []);
    React.useImperativeHandle(
      ref,
      () => {
        return {
          refresh() {
            getData();
          },
        };
      },
      []
    );
    return (
      <div className="datatable">
        <DataGrid
          className="datagrid"
          rows={data}
          columns={columns.concat(actionColumns)}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: pageSize } },
          }}
          pagination={true}
          autoHeight={true}
          slots={{ toolbar: GridToolbar }}
          {...props}
        />
      </div>
    );
  }
);
export default Datatable;
