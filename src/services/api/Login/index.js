import { create } from "apisauce";

import { config } from "../../../config/default";
import * as tunnel from "../../tunnle/index";
const backend = config.backend;

export const Login = async (LoginInfo) => {
  try {
    const syncState = await tunnel.initClientKeys();
    if (syncState !== tunnel.syncErrors.inSync) {
      alert("Server Out Of Sync");
      return;
    }
    const encData = await tunnel.defaultAesEncrypt(JSON.stringify(LoginInfo));
    /** NOT SECURED */
    const api = create({
      baseURL: backend.url,
    });
    const result = await api.post("/auth/login", encData);
    if (result.status !== 200) {
      return null;
    }
    // //console.log("SET TOOOOOOOOOOOOOOOOKEN");
    // //console.log(result.data);
    if (Boolean(result.data)) {
      // //console.log("INSIDE ==> TOOOOOOOOOOOOOOOOKEN");
      tunnel.setToken(result.data.token);
    }
    return result.data;
  } catch (error) {
    // console.error("Login Errors");
    //console.log("==>" + error);
    return null;
  }
};
