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
const CampaginesForm = ({ open, onClose, initialValue, method }) => {
  //console.log("method" ,{method}," initialValue",initialValue)
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
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        Array.from(formData[key]).forEach((file) => {
          formDataToSubmit.append("images", file);
        });
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    const data = await utils.default_post(
      "upsert_campaign",
      formDataToSubmit,
      true
    );
    if (data.success) {
      noti.success(catAdded);
      onClose();
    } else {
      noti.error(catAddedError);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files;
    setFormData((prevData) => ({
      ...prevData,
      images: file,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{T("AddNewCategoury")}</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <DashAutoComplete
                label="product"
                value={formData.product_id}
                service_url="get_products"
                sx={{ width: "100%" }}
                onChange={(e, v) => handleChange("product_id", v.id)}
                xs={12}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="name"
                label={T("Name")}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="name_en"
                label={T("Name_en")}
                value={formData.name_en}
                onChange={(e) => handleChange("name_en", e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="start_date"
                type="date"
                InputLabelProps={{ shrink: true }}
                label={T("start_date")}
                value={formData.start_date?.substring(0, 10)}
                onChange={(e) => handleChange("start_date", e.target.value)}
                fullWidth
                //style={{ direction: "ltr" }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="draw_date"
                type="date"
                label={T("draw_date")}
                InputLabelProps={{ shrink: true }}
                value={formData.draw_date?.substring(0, 10)}
                onChange={(e) => handleChange("draw_date", e.target.value)}
                fullWidth
                //dir="ltr"
                //style={{ direction: "ltr" }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="prize_name"
                type="text"
                label={T("prize_name")}
                InputLabelProps={{ shrink: true }}
                value={formData.prize_name}
                onChange={(e) => handleChange("prize_name", e.target.value)}
                fullWidth
                //dir="ltr"
                // style={{ direction: "ltr" }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="prize_url"
                type="text"
                label={T("prize_url")}
                value={formData.prize_url}
                onChange={(e) => handleChange("prize_url", e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                //dir="ltr"
                //style={{ direction: "ltr" }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="remaining_qty"
                type="number"
                label={T("remaining_qty")}
                value={formData.remaining_qty}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleChange("remaining_qty", e.target.value)}
                fullWidth
                //dir="ltr"
                //style={{ direction: "ltr" }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="target"
                type="number"
                label={T("target")}
                value={formData.target}
                onChange={(e) => handleChange("target", e.target.value)}
                fullWidth
                //dir="ltr"
                InputLabelProps={{ shrink: true }}
                //style={{ direction: "ltr" }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="note"
                type="textarea"
                label={T("note")}
                value={formData.note}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleChange("note", e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  fullWidth
                  inputProps={{ multiple: true }}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
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

export default CampaginesForm;
