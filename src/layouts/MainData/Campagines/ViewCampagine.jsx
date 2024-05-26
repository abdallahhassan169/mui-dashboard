import React from "react";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import * as utils from "../../../services/utils";

import DashboardLayout from "MainWidgets/LayoutContainers/DashboardLayout";
import DashboardNavbar from "MainWidgets/Navbars/DashboardNavbar";
import Invoices from "./Invoices";
import ImagesCarousel from "../../../components/ImagesCarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailsText from "./DetailsText";
import Card from "@mui/material/Card";
function ViewCampagine() {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState({});

  const getData = async () => {
    const data = await utils.default_post("campaign_products", { ids: [id] });
    if (data.success) {
      setData(data.data.rows[0].full_data);
    } else {
    }
  };
  useEffect(() => {
    getData();
  }, [id]);
  return (
    <DashboardLayout>
      {/* <DashboardNavbar absolute isMini /> */}
      {data && (
        <MDBox mt={8}>
          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={8}>
                <ImagesCarousel items={data.images} imageKey={"url"} />
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
                      <DetailsText title="id" value={data?.campaign?.id} />
                      <DetailsText title="الاسم" value={data?.campaign?.name} />
                      <DetailsText title="المنتج" value={data?.product?.name} />
                      <DetailsText title="المنتج" value={data?.product?.name} />

                      <DetailsText
                        title="الكمية المتبقية"
                        value={data?.campaign?.remaining_qty}
                      />
                      <DetailsText
                        title="target"
                        value={data?.campaign?.target}
                      />
                      <DetailsText
                        title="تاريخ البدء"
                        value={data?.campaign?.start_date}
                      />
                      <DetailsText
                        title="تاريخ السحب"
                        value={data?.campaign?.draw_date}
                      />
                      <DetailsText
                        title="ملاحظة"
                        value={data?.campaign?.note}
                      />
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

export default ViewCampagine;
