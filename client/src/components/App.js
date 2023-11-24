import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("access_token"))
  );
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("user_name");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    setIsLoggedIn(Boolean(localStorage.getItem("access_token")));
  }, []);
  function updateUserName(newName) {
    setUserName(newName);
    localStorage.setItem("user_name", newName);
  }

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userName={userName}
      />
      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <Login
              {...props}
              setIsLoggedIn={setIsLoggedIn}
              setUserName={setUserName}
              setUserId={setUserId}
            />
          )}
        />
        <Route path="/register" component={Register} />
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          path="/logout"
          render={(props) => (
            <Logout
              {...props}
              setIsLoggedIn={setIsLoggedIn}
              setUserName={setUserName}
              setUserId={setUserId}
              isLoggedIn={setIsLoggedIn}
            />
          )}
        />
        {/* Other private routes go here */}
      </Switch>
    </Router>
  );
};

export default App;
