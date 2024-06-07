// ProductForm.js
import React, { useState, useEffect } from "react";
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
import * as utils from "services/utils";

import T from "context/languageProvider";
import useNotification from "hooks/NotificationHook";

const ProductForm = ({ open, onClose, initialValue }) => {
  const noti = useNotification();

  const initialFormData = initialValue
    ? initialValue
    : {
        name: "",
        category: null,
        weight: "",
        image: null,
        description: "",
        sku: "",
        isActive: false,
        normalPrice: "",
        sellingPrice: "",
        inStore: false,
      };

  const [formData, setFormData] = useState(initialFormData);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    setFormData(initialFormData);

    getCat();
  }, [open]);
  const getCat = async () => {
    const data = await utils.default_post("/api/categories/getCats", {});
    setCats(data.data);
  };
  const prodAdded = T("prodAdded");
  const prodAddedError = T("prodAddedError");
  const prodCatRequire = T("prodCatRequire");

  const handleSave = async () => {
    if (formData.name && formData.egp_price) {
      const data = await utils.default_post("upsert_product", formData, true);
      if (data.success) {
        noti.success(prodAdded);
        onClose();
      } else {
        noti.error(prodAddedError);
      }
    } else {
      noti.error(prodCatRequire);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>{T("addNewProduct")}</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12} md={8}>
              <Grid
                container
                spacing={1}
                sx={{
                  margin: 1,
                  borderRadius: "8px",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                  padding: 1,
                }}
              >
                <Grid item xs={12} sx={{ margin: 0, padding: 0 }}>
                  <Typography variant="h6">{T("ProductDetails")}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="name"
                    label="Name"
                    type="text"
                    //variant="filled"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="name_en"
                    label="Name en"
                    type="text"
                    //variant="filled"
                    value={formData.name_en}
                    onChange={(e) => handleChange("name_en", e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="category"
                    label="Category"
                    type="text"
                    //variant="filled"
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    label="Description"
                    type="text"
                    //variant="filled"
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    id="brand_name"
                    label="Brand Name"
                    type="text"
                    //variant="filled"
                    value={formData.brand_name}
                    onChange={(e) => handleChange("brand_name", e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">{T("ImageDetails")}</Typography>
                  <TextField
                    id="image"
                    label="Image"
                    type="file"
                    // variant="filled"
                    onChange={handleFileChange}
                    fullWidth
                    margin="normal"
                    inputProps={{ accept: "image/*" }}
                  />
                  {formData.image && (
                    <Box>
                      <Typography variant="caption">Image Preview:</Typography>
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Product Preview"
                        style={{ maxWidth: "100%", marginTop: "8px" }}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} sx={{ marginTop: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                      padding: "16px",
                    }}
                  >
                    <Typography variant="h6">{T("availability")}</Typography>

                    <Grid item xs={12} md={12}>
                      <TextField
                        id="total_qty"
                        label="Total Quantity"
                        type="number"
                        // variant="filled"
                        value={formData.total_qty}
                        onChange={(e) =>
                          handleChange("total_qty", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        id="remaining_qty"
                        label="Remaining Quantity"
                        type="number"
                        // variant="filled"
                        value={formData.remaining_qty}
                        onChange={(e) =>
                          handleChange("remaining_qty", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                      padding: "16px",
                      marginTop: "16px",
                    }}
                  >
                    <Typography variant="h6">{T("PriceDetails")}</Typography>
                    <TextField
                      id="egp_price"
                      label="EGP Price"
                      type="number"
                      //variant="filled"
                      value={formData.egp_price}
                      onChange={(e) =>
                        handleChange("egp_price", e.target.value)
                      }
                      fullWidth
                      margin="normal"
                      required
                    />
                    <TextField
                      id="use_price"
                      label="usd Price"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      // variant="filled"
                      value={formData.usd_price}
                      onChange={(e) =>
                        handleChange("use_price", e.target.value)
                      }
                      fullWidth
                      margin="normal"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ marginTop: "16px" }}>
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
                        marginLeft: "8px",
                      }}
                    >
                      {T("save")}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
