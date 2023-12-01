import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "./App";
import axios from "axios";
import PostForLoggedIn from "./PostForLoggedIn";
import "./homestyle.css";

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
      <br />
      <h2 className="homeTitle">Welcome to PostedBy, {userName}!</h2>
      <h4 className="homeTitle">Profiles created by Your Friends</h4>
      {/* Render user posts */}
      <PostForLoggedIn posts={userPosts} userId={userId} />
      {/* Add other dashboard content here */}
    </div>
  );
};

export default Dashboard;
