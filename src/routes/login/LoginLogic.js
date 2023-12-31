import { useState, useContext } from "react";
import AuthApi from "../../backendApi/auth/authApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import AlertContext from "../AlertContext";

export default function LoginLogic() {
  const authContext = useContext(AuthContext);
  const authApi = AuthApi(authContext);
  const alertContext = useContext(AlertContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const loginUser = async (e, userData) => {
    e.preventDefault();
    try {
      const resp = await authApi.loginUser(userData);
      if (resp.status == 200) {
        const { userId } = resp.data;
        authContext.setUserId(userId || 0);
        alertContext.setAlert({ message: "Login Successful!", open: true });

        localStorage.setItem("userId", userId);
        navigate(`/users/${userId}`);
      } else {
        console.log(resp.status);
      }
    } catch (error) {
      alertContext.setAlert({
        message: "Login failed!",
        severity: "error",
        open: true,
      });
      console.log(error);
    }
  };

  return { loginUser, handleChange, formData, errors };
}
