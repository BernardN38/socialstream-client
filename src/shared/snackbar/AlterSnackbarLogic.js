import { useContext } from "react";
import AlertContext from "../../routes/AlertContext";

export default function AlertSnackbarLogic() {
  const alertContext = useContext(AlertContext);
  console.log(alertContext);
  const { alert, setAlert } = alertContext;
  //   const [alert, setAlert] = useState({ message: "", open: false });
  return { alert, setAlert };
}
