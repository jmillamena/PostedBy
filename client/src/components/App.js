// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Navbar from "./Navbar";
// import Login from "./Login";
// import Register from "./Register";
// import Logout from "./Logout";
// import PrivateRoute from "./PrivateRoute";
// import Dashboard from "./Dashboard";
// import FriendsContainer from "./FriendsContainer";
// import UserProfile from "./UserProfile";
// import Home from "./Home";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     Boolean(localStorage.getItem("access_token"))
//   );
//   const [userName, setUserName] = useState("");
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     const storedUserName = localStorage.getItem("user_name");
//     if (storedUserName) {
//       setUserName(storedUserName);
//     }

//     const storedUserId = localStorage.getItem("user_id");
//     if (storedUserId) {
//       setUserId(storedUserId);
//     }

//     setIsLoggedIn(Boolean(localStorage.getItem("access_token")));
//   }, []);
//   function updateUserName(newName) {
//     setUserName(newName);
//     localStorage.setItem("user_name", newName);
//   }

//   return (
//     <Router>
//       <Navbar
//         isLoggedIn={isLoggedIn}
//         setIsLoggedIn={setIsLoggedIn}
//         userName={userName}
//         userId={userId}
//       />
//       <Switch>
//         <Route path="/" component={Home} exact />
//         <Route
//           path="/login"
//           render={(props) => (
//             <Login
//               {...props}
//               setIsLoggedIn={setIsLoggedIn}
//               setUserName={setUserName}
//               setUserId={setUserId}
//             />
//           )}
//         />
//         <Route path="/register" component={Register} />
//         <PrivateRoute
//           path="/dashboard"
//           component={Dashboard}
//           isLoggedIn={isLoggedIn}
//         />

//         <PrivateRoute
//           path="/friends"
//           component={FriendsContainer}
//           isLoggedIn={isLoggedIn}
//           userId={userId}
//         />
//         <PrivateRoute
//           path="/profile/:friendId"
//           component={UserProfile} // Use UserProfile component for user profiles
//           isLoggedIn={isLoggedIn}
//         />
//         <PrivateRoute
//           path="/logout"
//           render={(props) => (
//             <Logout
//               {...props}
//               setIsLoggedIn={setIsLoggedIn}
//               setUserName={setUserName}
//               setUserId={setUserId}
//               isLoggedIn={setIsLoggedIn}
//             />
//           )}
//         />
//         {/* Other private routes go here */}
//       </Switch>
//     </Router>
//   );
// };

// export default App;

//change to useContext for authorization
import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import FriendsContainer from "./FriendsContainer";
import UserProfile from "./UserProfile";
import Home from "./Home";
import CreatePost from "./CreatePost";
import YourPosts from "./YourPosts";

// Create a context for authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        userId,
        setUserId,
        updateUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/friends" component={FriendsContainer} />
          <PrivateRoute path="/profile/:friendId" component={UserProfile} />
          <PrivateRoute path="/create-post" component={CreatePost} />
          <PrivateRoute path="/your-posts" component={YourPosts} />
          <PrivateRoute path="/logout" component={Logout} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export { useAuth };
export default App;
