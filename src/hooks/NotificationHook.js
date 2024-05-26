// https://www.npmjs.com/package/react-notifications
import "react-notifications/lib/notifications.css";
import "./notification.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { 
  NotificationManager,
} from "react-notifications";
const MySwal = withReactContent(Swal);
const useNotification = () => { 
  return {
    info: (message, title, timeOut, callback, priority) => {
      NotificationManager.info(message, title, timeOut, callback, priority);
    },
    success: (message, title, timeOut, callback, priority) => {
      NotificationManager.success(message, title, timeOut, callback, priority);
    },
    warning: (message, title, timeOut, callback, priority) => {
      NotificationManager.warning(message, title, timeOut, callback, priority);
    },
    error: (message, title, timeOut, callback, priority) => {
      // //console.log("useNotification",message)
      try {
        
      NotificationManager.error(message, title, timeOut, callback, priority);
      } catch (error) {
        
      // //console.log("useNotification error",error)
      }
    },
    /*
  icon: "success",
        title: <i>{title}</i>,
        html: <i>{message}</i>,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
*/
    /*   
    const { value: text } = await Swal.fire({
    input: 'textarea',
    inputLabel: 'Message',
    inputPlaceholder: 'Type your message here...',
    inputAttributes: {
      'aria-label': 'Type your message here'
    },
    showCancelButton: true
     })
    if (text) {
      Swal.fire(text)
    }  
   */
    DASHAlert: (onOk, onCancel, onDeny, { ...props }) => {
      return MySwal.fire({ allowOutsideClick: false, ...props }).then(
        (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed && onOk) onOk();
          else if (result.isDenied && onDeny) onDeny();
          else if (result.isDismissed && onCancel) onCancel();
        }
      );
    },
    DASHInput: async ({ ...props }) => {
      const { isConfirmed,  value } = await MySwal.fire({
        allowOutsideClick: false,
        closeOnConfirm: false,

        // closeOnCancel: false,
        ...props,
      });
      if (isConfirmed) {
        return value;
      }
      return null;
    },
  };
};
export default useNotification;
