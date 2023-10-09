import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Slide } from "@mui/material";
import { useState } from "react";
import AlertContext from "../../routes/AlertContext";
import AlertSnackbarLogic from "./AlterSnackbarLogic";

function AlertSnackbar() {
  const { alert, setAlert, handleClose } = AlertSnackbarLogic();

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity || "success"}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default AlertSnackbar;
