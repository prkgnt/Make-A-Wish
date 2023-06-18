import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import User from "./User";

const AppRouter = ({ isLoggedIn, userObj }) => {
  // const mainRouter = createHashRouter(
  //   [
  //     {
  //       path: "/",
  //       element: isLoggedIn ? <Home userObj={userObj} /> : <SignIn />,
  //     },
  //     {
  //       path: "/signUp",
  //       element: <SignUp />,
  //     },
  //     {
  //       path: "/user/:linkId",
  //       element: <User userObj={userObj} />,
  //     },
  //   ],
  //   {
  //     basename: "/Make-A-Wish",
  //   }
  // );
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home userObj={userObj} /> : <SignIn />}
        />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/user/:linkId" element={<User userObj={userObj} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
