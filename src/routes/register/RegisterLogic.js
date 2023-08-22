import AuthApi from "../../backendApi/auth/authApi";
export default function RegisterLogic() {
  const authApi = AuthApi();
  const registerUser = async (userData) => {
    try {
      const resp = await authApi.registerUser(userData);
      console.log(resp);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return { registerUser };
}
