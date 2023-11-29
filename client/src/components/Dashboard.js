// //change to useAuth

// import React from "react";
// import { Redirect } from "react-router-dom";
// import { useAuth } from "./App";

// const Dashboard = () => {
//   const { userName, isLoggedIn } = useAuth();

//   // Redirect to login page if not authenticated
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

// import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
// import { useAuth } from "./App";
// import axios from "axios";
// import PostForLoggedIn from "./PostForLoggedIn";

// const Dashboard = () => {
//   const { userName, userId, isLoggedIn } = useAuth();
//   const [userPosts, setUserPosts] = useState([]);

//   useEffect(() => {
//     const fetchUserPosts = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:5555/getpostsbyrecipient/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             },
//           }
//         );
//         setUserPosts(response.data.posts);
//       } catch (error) {
//         console.error("Error fetching user posts", error);
//       }
//     };

//     if (isLoggedIn) {
//       fetchUserPosts();
//     }
//   }, [userId, isLoggedIn]);

//   // Redirect to login page if not authenticated
//   if (!isLoggedIn) {
//     return <Redirect to="/login" />;
//   }

//   return (
//     <div>
//       <h2>Welcome to PostedBy, {userName}!</h2>
//       <h3>Your Posts:</h3>
//       {/* Render user posts */}
//       <PostForLoggedIn userPosts={userPosts} userId={userId} />
//       {/* Add other dashboard content here */}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "./App";
import axios from "axios";
import PostForLoggedIn from "./PostForLoggedIn";

const Dashboard = () => {
  const { userName, userId, isLoggedIn } = useAuth();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5555/getpostsbyuserid/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(response.data);
        setUserPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching user posts", error);
      }
    };

    if (isLoggedIn) {
      fetchUserPosts();
    }
  }, [userId, isLoggedIn]);

  // Redirect to login page if not authenticated
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h2>Welcome to PostedBy, {userName}!</h2>
      <h3>Your Posts:</h3>
      {/* Render user posts */}
      <PostForLoggedIn posts={userPosts} userId={userId} />
      {/* Add other dashboard content here */}
    </div>
  );
};

export default Dashboard;
