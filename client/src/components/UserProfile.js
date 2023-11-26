import React, { useState, useEffect } from "react";
import axios from "axios";
import PostForm from "./PostForm";

const UserProfile = ({ match }) => {
  const { friendId } = match.params;
  const [friendProfile, setFriendProfile] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [isFriends, setIsFriends] = useState(false);

  // Define fetchFriendProfile outside of useEffect
  const fetchFriendProfile = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5555/users/${friendId}`
      );
      setFriendProfile(response.data.user);

      // Check if the logged-in user is friends with the person
      // whose profile they are viewing
      const token = localStorage.getItem("access_token");
      const loggedInUserId = localStorage.getItem("user_id");
      if (loggedInUserId) {
        const friendsResponse = await axios.get(
          `http://127.0.0.1:5555/users/${loggedInUserId}/friends`
        );

        const friendsIds = friendsResponse.data.friends.map(
          (friend) => friend.id
        );
        setIsFriends(friendsIds.includes(response.data.user.id));
      }
    } catch (error) {
      console.error("Error fetching friend profile", error);
    }
  };

  useEffect(() => {
    // Call fetchFriendProfile
    fetchFriendProfile();
  }, [friendId]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    if (!isFriends) {
      setFieldError(
        "contentText",
        `Must be friends with ${friendProfile.username} to create a post.`
      );
      setSubmitting(false);
      return;
    }

    const token = localStorage.getItem("access_token");
    console.log("Access Token:", token);
    console.log("Form Data:", values);

    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("content_text", values.contentText);
      formData.append("content_image", values.contentImage);

      const response = await axios.post(
        "http://127.0.0.1:5555/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post created successfully", response.data);
    } catch (error) {
      console.error("Error creating post", error);
      setFieldError("contentText", "Error creating post");
    } finally {
      setSubmitting(false);
    }
  };

  if (!friendProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{friendProfile.username}'s Profile</h2>
      {isFriends ? (
        <button onClick={() => setShowPostForm(!showPostForm)}>
          {showPostForm ? "Hide Post Form" : "Create Post"}
        </button>
      ) : (
        <p>
          You must be friends with {friendProfile.username} to create a post.
        </p>
      )}
      {showPostForm && <PostForm onSubmit={handleSubmit} />}
    </div>
  );
};

export default UserProfile;
