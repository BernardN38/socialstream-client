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
  return { getUser };
}
