import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { green, red } from "@mui/material/colors";

export const ErrorBtn = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[800]),
    backgroundColor: red[800],
    "&:hover": {
      backgroundColor: red[800],
    },
  }));
  export const SuccessBtn = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[800]),
    backgroundColor: green[800],
    "&:hover": {
      backgroundColor: green[800],
    },
  }));