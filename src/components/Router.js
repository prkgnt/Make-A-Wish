import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import User from "./User";

const AppRouter = ({ isLoggedIn, userObj }) => {
  const mainRouter = createBrowserRouter([
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
      element: <User />,
    },
  ]);
  return <RouterProvider router={mainRouter} />;
};

export default AppRouter;
