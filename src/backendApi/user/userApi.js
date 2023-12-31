import axios from "axios";
import { serverUrl } from "../config";
export default function UserApi(userId) {
  const getUser = async () => {
    const url = new URL(`/api/v1/users/${userId}`, serverUrl);
    try {
      const resp = await axios.get(url.toString(), {
        withCredentials: true,
      });
      return resp.data;
    } catch (error) {
      throw error;
    }
  };
  const updateUser = async (userData) => {
    const url = new URL(`/api/v1/users/${userId}`, serverUrl);
    try {
      const jsonData = JSON.stringify(userData);
      const resp = await axios.patch(url.toString(), jsonData, {
        withCredentials: true,
      });
      return resp.data;
    } catch (error) {
      throw error;
    }
  };
  const deltetUser = async () => {
    const url = new URL(`/api/v1/users/${userId}`, serverUrl);
    try {
      const resp = await axios.delete(url.toString(), {
        withCredentials: true,
      });
      return resp.data;
    } catch (error) {
      throw error;
    }
  };

  return { getUser, updateUser };
}
