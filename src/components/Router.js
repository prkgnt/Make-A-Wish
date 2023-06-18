import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import User from "./User";

const AppRouter = ({ isLoggedIn, userObj }) => {
  const mainRouter = createHashRouter(
    [
      {
        path: "/",
        element: isLoggedIn ? <Home userObj={userObj} /> : <SignIn />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/user/:linkId",
        element: <User userObj={userObj} />,
      },
    ],
    {
      basename: "/Make-A-Wish",
    }
  );
  return <RouterProvider router={mainRouter} />;
};

export default AppRouter;
