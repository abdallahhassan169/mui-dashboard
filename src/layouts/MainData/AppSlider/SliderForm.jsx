// CategoryForm.js
import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  Typography,
} from "@mui/material";

import T from "context/languageProvider";
import useNotification from "hooks/NotificationHook";

import * as utils from "services/utils";
import DashAutoComplete from "../../../components/common/AutoComplete";
const AppSliderForm = ({ open, onClose, initialValue, method, type }) => {
  //console.log("method" ,{method}," initialValue",initialValue)
  console.log(type, "herrree");
  const noti = useNotification();
  const catAdded = T("catAdded");
  const catAddedError = T("catAddedError");
  const initialFormData = initialValue
    ? initialValue
    : {
        name: "",
        start_date: "",
        draw_date: "",
        description: "",
        status: "",
      };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(initialFormData);
  }, [open]);
  const handleSave = async () => {
    const formDataToSubmit = new FormData();

    // Convert formData fields to FormData
    Object.keys({ ...formData }).forEach((key) => {
      if (key === "images") {
        Array.from(formData[key]).forEach((file) => {
          formDataToSubmit.append("images", file);
        });
        formDataToSubmit.append("type", type);
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    const data = await utils.default_post("add_assets", formDataToSubmit, true);
    console.log(formDataToSubmit);
    if (data.success) {
      noti.success(catAdded);
      onClose();
    } else {
      noti.error(catAddedError);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      banner: file,
    }));
  };
  const handleMultiFileChange = (event) => {
    const files = event.target.files;
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{T("AddNewCategoury")}</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid item xs={12} md={6}>
                <label>الصور </label>

                <TextField
                  type="file"
                  accept="image/*"
                  onChange={handleMultiFileChange}
                  fullWidth
                  margin="normal"
                  inputProps={{ multiple: true }}
                  sx={{ width: "100%" }}
                />
                {formData.imageCategorie && (
                  <Box mt={1}>
                    <Typography variant="caption">Image Preview:</Typography>
                    <img
                      src={URL.createObjectURL(formData.imageCategorie)}
                      alt="Category Preview"
                      style={{ maxWidth: "100%", marginTop: "8px" }}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "warning.main",
            color: "common.white",
            "&:hover": {
              backgroundColor: "warning.dark",
            },
          }}
        >
          {T("cancel")}
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "success.main",
            color: "common.white",
            "&:hover": {
              backgroundColor: "success.dark",
            },
          }}
        >
          {T("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppSliderForm;
