// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { BorderAllOutlined, PictureAsPdf } from "@mui/icons-material";
export default function DetailsText({ title, id, value, noGutter }) {
  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
      sx={{ borderBottom: "1px solid grey" }}
    >
      <MDBox lineHeight={1.125}>
        <MDTypography
          display="block"
          variant="button"
          fontWeight="medium"
          sx={{ ml: 2 }}
        >
          {title}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" alignItems="center">
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ mr: 2 }}
        >
          {value}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}
