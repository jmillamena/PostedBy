// // Example of how to use Friends component in another component
// import React from "react";
// import Friends from "./Friends";
// import UserProfile from "./UserProfile";
// import { Link } from "react-router-dom";

// const FriendsContainer = () => {
//   const userId = localStorage.getItem("user_id");
//   const token = localStorage.getItem("access_token");

//   return (
//     <div>
//       <Friends userId={userId} token={token} />
//       <UserProfile userId={userId} token={token} />
//     </div>
//   );
// };

// export default FriendsContainer;

// Example of how to use Friends component in another component
import React from "react";
import Friends from "./Friends";
import { Link } from "react-router-dom";

const FriendsContainer = () => {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("access_token");

  return <Friends userId={userId} token={token} />;
};

export default FriendsContainer;
