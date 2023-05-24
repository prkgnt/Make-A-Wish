import React, { useEffect, useState } from "react";
import AppRouter from "./components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const auth = getAuth();
  console.log(auth.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
