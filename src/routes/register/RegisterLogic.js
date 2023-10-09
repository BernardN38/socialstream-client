import AuthApi from "../../backendApi/auth/authApi";
export default function RegisterLogic() {
  const authApi = AuthApi();
  const registerUser = async (userData) => {
    try {
      const resp = await authApi.registerUser(userData);
      alertContext.setAlert({
        message: "Registration successful!",
        severity: "success",
        open: true,
      });
    } catch (error) {
      alertContext.setAlert({
        message: "Registration failed!",
        severity: "error",
        open: true,
      });
      console.log(error.response.data);
    }
  };
  return { registerUser };
}
