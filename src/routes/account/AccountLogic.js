import { useState, useContext } from "react";
import UserApi from "../../backendApi/user/userApi";
import AuthContext from "../AuthContext";
import { serverUrl } from "../../backendApi/config";
export default function AccountLogic() {
  const authContext = useContext(AuthContext);
  const { userId } = authContext;
  const [user, setUser] = useState({});
  const userApi = UserApi(userId);
  const profileImageSrc = `${serverUrl}/api/v1/media/users/${userId}`;
  const getUser = async () => {
    try {
      const user = await userApi.getUser(userId);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  return { user, getUser, profileImageSrc };
}
