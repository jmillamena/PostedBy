// Example of how to use Friends component in another component
import React from "react";
import Friends from "./Friends";

const FriendsContainer = () => {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("access_token"); // Replace with the actual access token

  return <Friends userId={userId} token={token} />;
};

export default FriendsContainer;
