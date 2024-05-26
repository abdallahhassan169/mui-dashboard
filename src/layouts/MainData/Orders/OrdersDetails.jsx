import React from "react";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import * as utils from "../../../services/utils";
import useNotification from "hooks/NotificationHook";

import DashboardLayout from "MainWidgets/LayoutContainers/DashboardLayout";
import DashboardNavbar from "MainWidgets/Navbars/DashboardNavbar";

import ImagesCarousel from "../../../components/ImagesCarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailsText from "./DetailsText";
import Card from "@mui/material/Card";
import { Dropdown } from "bootstrap";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
function ViewOrder() {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState({});
  const [stData, setStData] = useState([]);
  const noti = useNotification();
  const getSatatus = async () => {
    const data = await utils.default_post("get_order_status");
    if (data.success) {
      setStData(data?.data);
    } else {
    }
  };
  const getData = async () => {
    const data = await utils.default_post("order_by_id", { id });
    if (data.success) {
      setData(data?.data[0].full_data);
    } else {
    }
  };
  useEffect(() => {
    getData();
    getSatatus();
  }, [id]);
  const changeStatus = async (status) => {
    console.log(status);
    const data = await utils.default_post("change_order_status", {
      id,
      status: status.target.value,
    });
    if (data.success) {
      getData();
      noti.success("تم تعديل حالة الطلب");
    } else {
      noti.error("خطأ في تعديل حالة الطلب");
    }
  };
  return (
    <DashboardLayout>
      {/* <DashboardNavbar absolute isMini /> */}
      {data && (
        <MDBox mt={8}>
          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={8}>
                <ImagesCarousel items={data?.products} imageKey={"image_url"} />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Card sx={{ height: "100%" }}>
                  <Grid item sx={{ textAlign: "center" }}>
                    التفاصيل
                  </Grid>
                  <MDBox
                    component="ul"
                    display="flex"
                    flexDirection="column"
                    p={0}
                    m={0}
                  >
                    <div>
                      <DetailsText title="id" value={data?.order?.id} />
                      <DetailsText title="الاسم" value={data?.user?.name} />

                      {data?.products?.map((p, idx) => (
                        <DetailsText
                          title={`المنتج ${idx + 1}`}
                          value={p?.name}
                        />
                      ))}

                      <DetailsText
                        title="تاريخ الطلب"
                        value={data?.order?.created_at.substring(0, 10)}
                      />
                      <DetailsText title="الحالة" value={data?.status?.name} />

                      <DetailsText
                        title="العنوان"
                        value={data?.address?.area}
                      />
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          الحالة
                        </InputLabel>
                        <Select
                          sx={{ height: "40px", margin: "5px" }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={stData?.find(
                            (x) => parseInt(x.id) === parseInt(data?.status?.id)
                          )}
                          label="Age"
                          onChange={changeStatus}
                        >
                          {stData?.map((s) => (
                            <MenuItem value={s?.id}>{s?.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      )}
    </DashboardLayout>
  );
}

export default ViewOrder;
