import * as React from "react";
import { AuthContext } from "../contexts/AuthContext";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useDASHAuth = () => {
  const { user, logout, HandleDepartmentChange, CurrentDep, setCurrentDep } =
    React.useContext(AuthContext);
  const userParts = jwt_decode(user.token);
  const nUser = { ...userParts, ...user, isDASH: userParts.cat_id === 2 };
  const onDepartmentChange = (dep) => {
    // //console.log("=======>  " + dep);
    setCurrentDep(dep);
    if (HandleDepartmentChange) HandleDepartmentChange(dep);
    // //console.log("====AFTER ===>  " + dep);
  };
  // { uid, entity, cat_id, isDASH: cat_id === 2 , first_name: "Mohamed", last_name: "Amer", entity_name: "رئاسة هيئة الشراء" }
  return { user: nUser, logout, onDepartmentChange, setCurrentDep, CurrentDep };
};
export default useDASHAuth;
