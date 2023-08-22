import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";
import AuthContext from "./AuthContext";
import AlertSnackbar from "../shared/snackbar/AlertSnackbar";
import AlertContext from "./AlertContext";

export default function Root() {
  const [userId, setUserId] = useState(localStorage.getItem("userId") ?? -1);
  const [alert, setAlert] = useState({ message: "", open: false });
  return (
    <AuthContext.Provider value={{ userId: userId, setUserId: setUserId }}>
      <AlertContext.Provider value={{ alert: alert, setAlert: setAlert }}>
        <Navbar userId={userId} />
        <Outlet />
        <AlertSnackbar />
      </AlertContext.Provider>
    </AuthContext.Provider>
  );
}
