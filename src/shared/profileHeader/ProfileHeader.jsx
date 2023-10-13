import React, { useEffect } from "react";
import { Avatar, Box, Typography, Divider } from "@mui/material";
import ProfileHeaderLogic from "./ProfileHeaderLogic";
export default function ProfileHeader({ userId }) {
  const { getUserData, userData, profileImageSrc } = ProfileHeaderLogic(userId);
  const { username, firstname, lastname } = userData;
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          display: "left",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar src={profileImageSrc} sx={{ width: 60, height: 60 }}>
          B
        </Avatar>
        <Typography>{`${firstname} ${lastname}`}</Typography>
        <Typography>@{username}</Typography>
      </Box>
      <Divider variant="middle" />
    </Box>
  );
}
