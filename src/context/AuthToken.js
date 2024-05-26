import { useMaterialUIController } from "context";

function GetAuthToken(){
  const [controller, dispatch] = useMaterialUIController();
 
  return controller.token;
}

export default GetAuthToken;
