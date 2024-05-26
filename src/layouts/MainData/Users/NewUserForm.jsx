import React, { useState, useEffect } from "react";
import useNotification from "hooks/NotificationHook";

import * as utils from "services/utils";
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
  Typography,
} from "@mui/material";
import T from "context/languageProvider";
import { useContext } from "react";

const NewUserForm = ({ open, onClose, initialValue }) => {
  const initialFormData = initialValue
    ? initialValue
    : {
        Registrationnumber: "",
        role: "",
        name: "",
        lastName: "",
        email: "",
        phone: "",
        users: false,
        products: false,
        orders: false,
        store: false,
        clients: false,
        notice: false,
        theme: false,
        helpCenter: false,
      };
  const [formData, setFormData] = useState(initialFormData);
  const noti = useNotification();
  const userAdded = T("catAdded");
  const userAddedError = T("catAddedError");
  useEffect(() => {
    setFormData(initialFormData);
  }, [open]);

  const handleSave = async () => {
    const data = await utils.default_post("add_admin", formData);
    if (data.success) {
      noti.success(userAdded);
      onClose();
    } else {
      noti.error(userAddedError);
    }
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle style={{ fontWeight: 600 }}>{T("addNewUser")}</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label={T("name")}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={T("phone")}
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={T("email")}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label={T("password")}
                //value={formData.email}
                type="password"
                onChange={(e) => handleChange("password", e.target.value)}
                fullWidth
                margin="normal"
              />
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

export default NewUserForm;
