import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //store const storedUserLoggedInInfo into useEffect in order to prevent infinite loop
  //dependencies never change, the dep just change the first time the app runs
  //if I reload I stay logged in, because the info are now stored into localStorage
  //it runs after useState
  //but not everytime the components get reevaluate 
  //only when the dependencies change (in this specific scenario NEVER except the very first time the app runs)

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn"); 

    if (storedUserLoggedInInfo === "1") {
      setIsLoggedIn(true);
    }
  }, [])
  
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    localStorage.setItem("isLoggedIn", "1")
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
