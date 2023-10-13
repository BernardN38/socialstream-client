import { useState, useContext } from "react";
import PostApi from "../../backendApi/posts/postApi";
import AlertContext from "../../routes/AlertContext";
import Compressor from "compressorjs";
import { useNavigate } from "react-router-dom";
export default function CreatePostLogic(setPostCreatedCount) {
  const postApi = PostApi();
  const navigate = useNavigate();
  const alertContext = useContext(AlertContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    body: "",
    Image: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedImage) {
      new Compressor(selectedImage, {
        quality: 0.6,
        success(result) {
          const form = new FormData();
          form.append("media", result, result.name);
          form.append("body", formData.body);
          postApi
            .createPost(form)
            .then((resp) => {
              console.log(resp);
              setPostCreatedCount((prev) => prev + 1);
              alertContext.setAlert({
                message: "Post Created!",
                open: true,
              });
            })
            .catch((e) => {
              alertContext.setAlert({
                message: "Post Creation failed!",
                severity: "error",
                open: true,
              });
              console.log(e);
              if (e.response.status === 401) {
                navigate("/login");
              }
            });
        },
        error(err) {
          console.log(err);
        },
      });
    } else {
      const form = new FormData();
      form.append("body", formData.body);
      postApi
        .createPost(form)
        .then((resp) => {
          console.log(resp);
          setPostCreatedCount((prev) => prev + 1);
          alertContext.setAlert({
            message: "Post Created!",
            open: true,
          });
        })
        .catch((e) => {
          console.log(e);
          alertContext.setAlert({
            message: "Post Creation failed!",
            severity: "error",
            open: true,
          });
          if (e.response.status === 401) {
            navigate("/login");
          }
        });
    }
  };
  return { handleUpload, handleChange, handleImageChange, formData, errors };
}
