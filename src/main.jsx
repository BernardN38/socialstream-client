import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";
import Account from "./routes/account/Account";
import AccountUpdate from "./routes/account/update/AccountUpdate";
import Timeline from "./routes/timeline/Timeline";
import PublicProfile from "./routes/publicProfile/PublicProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "users/:userId",
        element: <PublicProfile />,
      },
      {
        path: "register/",
        element: <Register />,
      },
      {
        path: "login/",
        element: <Login />,
      },
      {
        path: "account/",
        children: [
          {
            index: true,
            element: <Account />,
          },
          {
            path: "update",
            element: <AccountUpdate />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
