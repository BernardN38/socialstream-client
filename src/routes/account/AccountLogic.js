import { useState, useContext } from "react";
import UserApi from "../../backendApi/user/userApi";
import AuthContext from "../AuthContext";
import AlertContext from "../AlertContext";
import { serverUrl } from "../../backendApi/config";
import Compressor from "compressorjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AccountLogic() {
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { userId } = authContext;
  const userApi = UserApi(userId);
  const profileImageSrc = `${serverUrl}/api/v1/media/users/${userId}`;
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const uploadImage = (e) => {
    e.preventDefault();
    console.log(selectedImage);
    new Compressor(selectedImage, {
      quality: 0.6,
      success(result) {
        const formData = new FormData();

        formData.append("image", result, result.name);
        console.log(result.size);
        axios
          .post(`${serverUrl}/api/v1/media/users/1/profileImage`, formData, {
            withCredentials: true,
          })
          .then((resp) => {
            console.log(resp);
            alertContext.setAlert({
              message: "Profile Image Updated!",
              open: true,
            });
          })
          .catch((e) => {
            console.log(typeof e.response.status);
            if (e.response.status === 401) {
              navigate("/login");
            }
          });
      },
      error(err) {
        console.log(err);
      },
    });
  };
  const getUser = async () => {
    try {
      const user = await userApi.getUser(userId);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    user,
    userId,
    getUser,
    profileImageSrc,
    uploadImage,
    handleImageChange,
  };
}
