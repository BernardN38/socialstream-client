import React, { useEffect, useState } from "react";
import AccountLogic from "./AccountLogic";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import axios from "axios";
import { serverUrl } from "../../backendApi/config";
export default function Account({ userId = 1 }) {
  const { user, getUser, profileImageSrc } = AccountLogic(userId);
  console.log(user);
  const { firstname, lastname, username, email } = user;
  useEffect(() => {
    getUser();
  }, [userId]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const uploadImage = (e) => {
    e.preventDefault();
    console.log(selectedImage);
    const formData = new FormData();
    formData.append("image", selectedImage);
    axios.post(`${serverUrl}/api/v1/users/1/profileImage`, formData, {
      withCredentials: true,
    });
  };
  return (
    <div>
      <Card sx={{ margin: 1, display: "flex", justifyContent: "center" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar alt={`${firstname} ${lastname}`} src={profileImageSrc} />
          <Typography variant="h6" gutterBottom>
            {username}
          </Typography>
          <Typography variant="body1">{email}</Typography>
          <Typography variant="body1">
            {firstname} {lastname}
          </Typography>
        </CardContent>
      </Card>
      <img src={profileImageSrc} width={"100%"} />
      <form>
        <input type="file" name="image" onChange={handleImageChange} />
        <button onClick={uploadImage}>submit</button>
      </form>
    </div>
  );
}
