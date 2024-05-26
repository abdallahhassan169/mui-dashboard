import * as React from "react";
import { UIContext } from "../contexts/UIContext";

const useUIHook = () => {
  const { showLoaderFlag, showLoader, hideLoader } =
    React.useContext(UIContext);
  return { showLoaderFlag, showLoader, hideLoader };
};
export default useUIHook;
