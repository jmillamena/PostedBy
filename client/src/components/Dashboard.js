import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming you set this state somewhere based on user authentication

  useEffect(() => {
    // Retrieve the username from local storage
    const storedUserName = localStorage.getItem("user_name");

    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

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
