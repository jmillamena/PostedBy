//with comments
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import PostForm from "./PostForm";
import Posts from "./Posts";
import "./homestyle.css";

const UserProfile = ({ match }) => {
  const { friendId } = match.params;
  const [friendProfile, setFriendProfile] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [isFriends, setIsFriends] = useState(false);
  const [userId, setUserId] = useState(null);
  const [recipientId, setRecipientId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchFriendProfile = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5555/users/${friendId}`
      );
      setFriendProfile(response.data.user);
      setRecipientId(response.data.user.id);

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
        setUserId(loggedInUserId);
      }

      // Check if the user is authenticated
      setIsAuthenticated(Boolean(localStorage.getItem("access_token")));
    } catch (error) {
      console.error("Error fetching friend profile", error);
    }
  };

  const handleAddFriend = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        `http://127.0.0.1:5555/users/${userId}/friends`,
        { friend_id: friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsFriends(true);
      console.log(`Friend request sent to user with ID ${friendId}`);
    } catch (error) {
      console.error("Error sending friend request", error);
    }
  };

  const handlePostSubmit = async (values, actions) => {
    console.log("Post form values:", values);

    const token = localStorage.getItem("access_token");

    try {
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post created successfully", response.data);

      setSuccessMessage("Post created successfully");

      window.location.reload();

      setShowPostForm(false);
    } catch (error) {
      console.error("Error creating post", error);
      actions.setFieldError("postContent", "Error creating post");
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchFriendProfile();
  }, [friendId]);

  return (
    <div>
      <br />
      <h2 className="homeTitle">{friendProfile?.username}'s Profile</h2>
      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage(null)}
          dismissible
        >
          {successMessage}
        </Alert>
      )}
      {isFriends ? (
        //   <Button
        //     className="custom-submit-button"
        //     variant="primary"
        //     onClick={() => setShowPostForm(!showPostForm)}
        //   >
        //     {showPostForm ? "Hide Post Form" : "Create Post"}
        //   </Button>
        // ) : (
        //   <div>
        //     <p>
        //       You must be friends with {friendProfile?.username} to create a post.
        //     </p>
        //     <Button
        //       className="custom-submit-button"
        //       variant="success"
        //       onClick={handleAddFriend}
        //     >
        //       Add Friend
        //     </Button>
        //   </div>
        <div className="button-container">
          {" "}
          {/* Apply the margin to this div */}
          <Button
            className="custom-submit-button spaced-button"
            variant="primary"
            onClick={() => setShowPostForm(!showPostForm)}
          >
            {showPostForm ? "Hide Post Form" : "Create Post"}
          </Button>
        </div>
      ) : (
        <div className="button-container">
          {" "}
          {/* Apply the margin to this div */}
          <p>
            You must be friends with {friendProfile?.username} to create a post.
          </p>
          <Button
            className="custom-submit-button spaced-button"
            variant="success"
            onClick={handleAddFriend}
          >
            Add Friend
          </Button>
        </div>
      )}

      {showPostForm && userId !== null && (
        <PostForm
          onSubmit={handlePostSubmit}
          authorId={userId}
          friends={[friendProfile]}
          initialRecipientId={recipientId}
        />
      )}

      <Posts recipientId={friendId} isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default UserProfile;
