import axios from "axios";
import { serverUrl } from "../config";
export default function PostApi() {
  const getPosts = async (userId, pageNo, pageSize) => {
    const url = new URL(
      `/api/v1/posts/users/${userId}?pageSize=5&pageNo=${pageNo}`,
      serverUrl
    );
    try {
      const resp = await axios.get(url.toString(), {
        withCredentials: true,
      });
      return resp.data;
    } catch (error) {
      throw error;
    }
  };
  const createPost = async (form) => {
    const url = new URL(`/api/v1/posts`, serverUrl);
    try {
      const resp = await axios.post(url.toString(), form, {
        withCredentials: true,
      });
      return resp;
    } catch (error) {
      throw error;
    }
  };
  const deletePost = async (postId) => {
    const url = new URL(`/api/v1/posts/${postId}`, serverUrl);
    try {
      const resp = await axios.delete(url.toString(), {
        withCredentials: true,
      });
      return resp.data;
    } catch (error) {
      throw error;
    }
  };
  return { getPosts, createPost, deletePost };
}
