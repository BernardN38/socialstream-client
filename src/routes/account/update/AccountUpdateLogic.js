import UserApi from "../../../backendApi/user/userApi";
import { useState } from "react";

export default function AccountUpdateLogic(userId) {
  const userApi = UserApi(userId);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });
  const updateUser = async (userData) => {
    try {
      const resp = await userApi.updateUser(userData);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    // Check each field
    Object.keys(formData).forEach((fieldName) => {
      if (!formData[fieldName].trim()) {
        newErrors[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`;
        valid = false;
      }
    });

    setErrors(newErrors);

    if (valid) {
      // Handle form submission here (e.g., send data to the server)
      console.log("Form data:", formData);
    }
  };
  return { updateUser, handleChange, handleSubmit, formData, errors };
}
