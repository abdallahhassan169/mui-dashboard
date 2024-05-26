import { config } from "config/constants";
import axios from "axios";
import { CleaningServices } from "@mui/icons-material";

const backend = config.backend;
export const ApiChannel = async (serviceUrl, params, useLoader = true) => {
  const token = getCookie("token");
  try {
    //console.log("token",`Bearer ${token}`)
    const Backend = backend.url;
    const res = await axios.post(
      Backend + serviceUrl,
      { ...params },
      { headers: { Authorization: `${token}` } }
    );

    //console.log("res",res);
    const Data =
      res.data != null
        ? { success: true, data: res.data }
        : { success: false, data: res.data };

    //console.log("errorData",Data);
    return Data;
  } catch (error) {
    //console.log("error");
  }
};
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
export const default_post = async (serviceUrl, params, useLoader = true) => {
  const result = await ApiChannel(serviceUrl, params);
  //console.log("default_postss",result)
  if (!Boolean(result))
    return { data: null, meta: null, error: "Server Error(1)", success: false };
  const { data } = result;
  return { data, error: null, success: true };
};
