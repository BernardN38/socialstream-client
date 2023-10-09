import { useContext } from "react";
import AlertContext from "../../routes/AlertContext";

export default function AlertSnackbarLogic() {
  const alertContext = useContext(AlertContext);
  const { alert, setAlert } = alertContext;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ message: "", severity: alert.severity, open: false });
  };
  return { alert, setAlert, handleClose };
}
