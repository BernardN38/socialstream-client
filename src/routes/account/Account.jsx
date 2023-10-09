import React, { useEffect, useState } from "react";
import AccountLogic from "./AccountLogic";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Input,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Account() {
  const {
    user,
    userId,
    getUser,
    profileImageSrc,
    uploadImage,
    handleImageChange,
  } = AccountLogic();
  const { firstname, lastname, username, email } = user;

  useEffect(() => {
    getUser();
  }, [userId]);

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

          <Card sx={{ padding: 1 }}>
            <Typography sx={{ display: "flex", justifyContent: "center" }}>
              Change Profile Image
            </Typography>
            <form>
              <Input type="file" name="image" onChange={handleImageChange} />
              <Button onClick={uploadImage} fullWidth>
                submit
              </Button>
            </form>
          </Card>
        </CardContent>
      </Card>
      <img src={profileImageSrc} width={"100%"} />
    </div>
  );
}
