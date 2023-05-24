import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import SignUp from "./SignUp";

const AppRouter = ({ isLoggedIn }) => {
  const mainRouter = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Home /> : <Auth />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
  ]);
  return <RouterProvider router={mainRouter} />;
};

export default AppRouter;
