import axios from "axios";
import { serverUrl } from "../config";
export default function AuthApi() {
  const registerUser = async (userData) => {
    try {
      const resp = await axios.post(
        `${serverUrl}/api/v1/auth/register`,
        userData
      );
      return resp; // Return the actual data from the response
    } catch (error) {
      throw error;
    }
  };
  const loginUser = async (userData) => {
    try {
      const resp = await axios.post(
        `${serverUrl}/api/v1/auth/login`,
        userData,
        {
          withCredentials: true,
        }
      );
      return resp; // Return the actual data from the response
    } catch (error) {
      throw error.response;
    }
  };
  return { registerUser, loginUser };
}
