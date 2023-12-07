//separating form from createpost
// CreatePost.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import PostForm from "./PostForm";
import { useAuth } from "./App";
import "./homestyle.css";

import "bootstrap/dist/css/bootstrap.min.css";

const CreatePost = () => {
  const { userId } = useAuth();
  const [friends, setFriends] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch the user's friends and update the state
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5555/users/${userId}/friends`
        );
        setFriends(response.data.friends);
      } catch (error) {
        console.error("Error fetching friends", error);
      }
    };

    fetchFriends();

    console.log("UserId:", userId);
  }, [userId]);

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("UserId in onSubmit:", userId);
      console.log("Form Values:", values);
      const response = await axios.post(
        "http://127.0.0.1:5555/posts",
        {
          content_text: values.postContent,
          author_id: userId,
          recipient_id: values.recipientId,
          content_image: values.postImage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // Handle the response as needed, e.g., display a success message
      console.log("Post created successfully", response.data);

      // Reset the form and display success message
      resetForm();
      setSuccessMessage("Post created successfully");
      setErrorMessage(""); // Clear any previous error message

      // Remove success message after a few seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error creating post", error);

      // Handle the error, e.g., display an error message
      setErrorMessage("Error creating post. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    } finally {
      // Ensure that setSubmitting is always called, regardless of success or failure
      setSubmitting(false);
    }
  };

  return (
    <div className="custom-create-post-form">
      <br />
      <h2 className="homeTitle">Create Post</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <PostForm onSubmit={handleFormSubmit} friends={friends} />
    </div>
  );
};

export default CreatePost;
