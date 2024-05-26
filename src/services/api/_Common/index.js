import { create } from "apisauce";
import { config } from "../../../config/default";
import * as tunnle from "../../tunnle/index";
import * as paramService from "./fileParamsManager";
import useNotification from "../../../hooks/NotificationHook";

// import
// import useDASHAuth from "../../../hooks/AuthHook";
const backend = config.backend;

export const errorCodes = {
  syncError: 1,
  serverError: 2,
};
export const get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  if (response.ok) {
    return response;
  }
  return null;
};
const handleCodes = {
  keepGoing: 1,
  stopSuccess: 2,
  stopFail: 3,
};
const handle_application_error = async (error) => {
  // //console.log("handle_application_error >>>>>>>>>>>");
  if (!error) return handleCodes.stopFail;
  // console.error(error);
  const { code /*, msg*/ } = error;
  if (code && code === errorCodes.syncError) {
    ////console.log("SYNC ERROROROROROR");
    if ((await tunnle.initClientKeys()) === tunnle.syncErrors.inSync)
      return handleCodes.stopSuccess;
    return handleCodes.keepGoing;
  }
  return handleCodes.stopFail;
};
const handles_server_error = (exc) => {
  // console.error(exc);
  return handleCodes.stopFail;
};
export const post_download_file = async (
  encrypt,
  serviceUrl,
  params,
  monitor
) => {
  // //console.log("HI DOWNLOAD");
  const internal_download = async () => {
    try {
      const api = create({
        baseURL: `${backend.url}/DASH`,
      });
      api.setHeaders({ "DASH-AUTH-HEAD": await tunnle.getToken() });
      const tunnleObject = await tunnle.createTunnleObject();
      tunnleObject.is_enc = false;
      api.setHeaders({
        "DASH-TOKEN-HEAD": JSON.stringify(tunnleObject),
      });
      if (monitor) api.addMonitor(monitor);
      api.setHeaders({ "DASH-HAS-FILES": 0 }); // No File Headers in File Download
      const reso = await api.post(serviceUrl, params);
      ////console.log("XXXXXXXXXXXXXXXXXXX");

      // //console.log(reso.headers);
      if (reso.status !== 200) {
        ////console.log("FILE DOWNLOAD Not OKKKKKKKKKKKKKKKKKKK ");
        const res = {
          success: false,
          date: null,
          meta: null,
          error: {},
        };
        return res;
      } // Here No Error Code Returned

      const res = {
        success: true,
        data: reso,
        meta: {},
        error: {},
      };
      return res;
    } catch (error) {
      // Internal Server Error (Server didn't responde)
      ////console.log("Errororororororororo");
      //console.error(error);
      // return handles_server_error(error);
      return null;
    }
  };
  let eCounter = 3;
  while (eCounter > 0) {
    const res = await internal_download();
    // //console.log(`Trial Number => ${eCounter}`);
    // //console.log(res);
    if (res.success /*|| res.errMangeResult === handleCodes.stopSuccess*/)
      return res;
    eCounter--;
  } 
  return null;
};
export const post = async (
  encrypt,
  serviceUrl,
  params,
  axiosConfig,
  pageLocation
) => {
  const internalPost = async (encrypt, serviceUrl, params, axiosConfig) => {
    try {
      const api = create({
        baseURL: `${backend.url}/DASH`,
      });
      
     //console.log("internalPost",serviceUrl)
      api.setHeaders({ "DASH-AUTH-HEAD": await tunnle.getToken() });
      // //console.log("token >>>> " + tunnle.getToken());
      const tunnleObject = await tunnle.createTunnleObject();
      tunnleObject.is_enc = encrypt;
      api.setHeaders({
        "DASH-TOKEN-HEAD": JSON.stringify(tunnleObject),
      });
      params["DASH-page-loc-route"] = JSON.stringify(pageLocation);

      // api.setHeaders({ "Content-Type": "multipart/form-data" });
      const { has_files, encData } = await paramService.manage_params(
        params,
        tunnleObject
      );
      // //console.log(
      //   `has_files >> has_files : ${has_files}  encData : ${encData}`
      // );

      api.setHeaders({ "DASH-HAS-FILES": has_files ? 1 : 0 });
      // //console.log("COMING BACCCCCCCCCCCCCCCCCCCCCCCCCC");
      // //console.log(encData);
      const response = await api.post(serviceUrl, encData, axiosConfig);
      // //console.log("AFTER BACKKKKKKKKKKKKKKKKKKKK");
      // //console.log(response.data);

      const { /* data, meta, */ error } = response.data;

      if (!error || Object.keys(error).length) {
        const res = {
          success: false,
          errMangeResult: await handle_application_error(error),
          date: null,
        };
        return res;
      } // Here No Error Code Returned
      const res = {
        success: response.ok ? true : false,
        errMangeResult: response.ok
          ? handleCodes.stopSuccess
          : handleCodes.stopFail,
        data: response.data,
      };
      return res;
    } catch (error) {
      //console.log("internalPosterror",error)
      // Internal Server Error (Server didn't responde)
      // console.error(error);
      // return handles_server_error(error);
      return {
        success: false,
        errMangeResult: handles_server_error(error),
        data: null,
      };
    }
  };
  let eCounter = 3;
  while (eCounter > 0) {
    const res = await internalPost(encrypt, serviceUrl, params, axiosConfig);
    // //console.log(`Trial Number => ${eCounter}`);
    // //console.log(res);
    if (res.success /*|| res.errMangeResult === handleCodes.stopSuccess*/)
      return res.data;
    if (res.errMangeResult === handleCodes.stopFail) {
      ////console.log("EWRRRR", res); 
      return { data: [], meta: null, error: { isError: true } };
      // const noti = useNotification();
      // return res.data;
    }
    eCounter--;
  } 
  return [];
};
const GoOut = () => {
  
};
