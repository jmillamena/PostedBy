// import React, { useEffect, useState } from "react";
// import { Redirect } from "react-router-dom";

// const Dashboard = () => {
//   const [userName, setUserName] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   useEffect(() => {
//     // Retrieve the username from local storage
//     const storedUserName = localStorage.getItem("user_name");

//     if (storedUserName) {
//       setUserName(storedUserName);
//     }
//   }, []);

//   if (!isLoggedIn) {
//     return <Redirect to="/login" />;
//   }

//   return (
//     <div>
//       <h2>Welcome to PostedBy, {userName}!</h2>
//       {/* Add other dashboard content here */}
//     </div>
//   );
// };

// export default Dashboard;

//change to useAuth

import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "./App";

const Dashboard = () => {
  const { userName, isLoggedIn } = useAuth();

  // Redirect to login page if not authenticated
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h2>Welcome to PostedBy, {userName}!</h2>
      {/* Add other dashboard content here */}
    </div>
  );
};

export default Dashboard;
