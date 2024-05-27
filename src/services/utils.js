import { config } from "config/constants";
import axios from "axios";
import { CleaningServices } from "@mui/icons-material";

const backend = config.backend;

function getCookie(name) {
  // Split the cookie string into individual cookies
  const cookies = document.cookie.split("; ");

  // Loop through each cookie to find the one with the specified name
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      // Return the value of the cookie
      return decodeURIComponent(cookieValue);
    }
  }

  // Return null if the cookie is not found
  return null;
}

export const Login = async (serviceUrl, params, useLoader = true) => {
  try {
    const Backend = backend.url;
    const apiUrl = Backend + serviceUrl;
    const res = await axios.post(apiUrl, params);
    return res.data
      ? { success: true, data: res.data }
      : { success: false, ...res.data };
  } catch (error) {
    return { success: false, ...error };
  }
};
export const ApiChannel = async (
  serviceUrl,
  params,
  isForm = false,
  useLoader = true
) => {
  const token = getCookie("token");
  try {
    const Backend = backend.url;
    let headers = {
      Authorization: token,
    };

    if (isForm) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
      params = JSON.stringify(params);
    }

    const res = await axios.post(Backend + serviceUrl, params, { headers });

    const Data =
      res.data != null
        ? { success: true, data: res.data }
        : { success: false, data: res.data };

    return Data;
  } catch (error) {
    console.error("error", error);
    return { success: false, data: null, error };
  }
};

export const default_post = async (
  serviceUrl,
  params,
  isForm = false,
  useLoader = true
) => {
  const result = await ApiChannel(serviceUrl, params, isForm, useLoader);
  if (!Boolean(result)) {
    return { data: null, meta: null, error: "Server Error(1)", success: false };
  }
  const { data } = result;
  return { data, error: null, success: true };
};
