import axios from "axios";
import { serverUrl } from "../config";
export default function MediaApi() {
  const getUserProfileImage = async (userId) => {
    console.log(userId);
    const url = new URL(`/api/v1/media/users/${userId}`, serverUrl);
    try {
      const resp = await axios.get(url.toString(), {
        withCredentials: true,
      });
      return resp.data;
    } catch (error) {
      throw error;
    }
  };
  return { getUserProfileImage };
}
