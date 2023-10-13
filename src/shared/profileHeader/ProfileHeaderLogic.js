import { useState } from "react";
import { serverUrl } from "../../backendApi/config";
import UserApi from "../../backendApi/user/userApi";
export default function ProfileHeaderLogic(userId) {
  const [userData, setUserData] = useState({});
  const userApi = UserApi(userId);
  const profileImageSrc = `${serverUrl}/api/v1/media/users/${userId}`;
  const getUserData = () => {
    userApi.getUser(userId).then((resp) => {
      setUserData(resp);
    });
  };
  return { getUserData, userData, profileImageSrc };
}
