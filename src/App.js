import React, { useEffect, useState } from "react";
import AppRouter from "./components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GlobalStyle } from "./fonts/globalStyle";

function App() {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
    </>
  );
}

export default App;
