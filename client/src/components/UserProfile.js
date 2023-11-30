// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import PostForm from "./PostForm";
// import Posts from "./Posts";

// const UserProfile = ({ match }) => {
//   const { friendId } = match.params;
//   const [friendProfile, setFriendProfile] = useState(null);
//   const [showPostForm, setShowPostForm] = useState(false);
//   const [isFriends, setIsFriends] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [posts, setPosts] = useState([]);

//   // Define fetchFriendProfile outside of useEffect
//   const fetchFriendProfile = async () => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:5555/users/${friendId}`
//       );
//       setFriendProfile(response.data.user);

//       // Check if the logged-in user is friends with the person
//       // whose profile they are viewing
//       const token = localStorage.getItem("access_token");
//       const loggedInUserId = localStorage.getItem("user_id");

//       if (loggedInUserId) {
//         const friendsResponse = await axios.get(
//           `http://127.0.0.1:5555/users/${loggedInUserId}/friends`
//         );

//         const friendsIds = friendsResponse.data.friends.map(
//           (friend) => friend.id
//         );
//         setIsFriends(friendsIds.includes(response.data.user.id));
//         setUserId(loggedInUserId); // Set userId here
//       }
//     } catch (error) {
//       console.error("Error fetching friend profile", error);
//     }
//   };

//   useEffect(() => {
//     fetchFriendProfile();
//   }, [friendId]);

//   // Add user as friend
//   const handleAddFriend = async () => {
//     try {
//       const token = localStorage.getItem("access_token");
//       const response = await axios.post(
//         `http://127.0.0.1:5555/users/${userId}/friends`,
//         { friend_id: friendId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // If the friend request is sent successfully, update state
//       setIsFriends(true);
//       console.log(`Friend request sent to user with ID ${friendId}`);
//     } catch (error) {
//       console.error("Error sending friend request", error);
//     }
//   };

//   const handleSubmit = async (
//     values,
//     { setSubmitting, setFieldError },
//     authorId
//   ) => {
//     console.log("Author ID received in handleSubmit:", authorId);
//     if (!isFriends) {
//       setFieldError(
//         "content_text",
//         `Must be friends with ${friendProfile.username} to create a post.`
//       );
//       setSubmitting(false);
//       return;
//     }

//     const token = localStorage.getItem("access_token");
//     console.log("Access Token:", token);
//     console.log("User ID:", authorId); // Use authorId instead of userId
//     console.log("Form Data:", values);

//     try {
//       // Create a FormData object to handle file uploads
//       const formData = new FormData();
//       formData.append("content_text", values.content_text);
//       formData.append("content_image", values.content_image);
//       formData.append("author_id", authorId);
//       console.log("Form Data with author_id:", formData);

//       const response = await axios.post(
//         "http://127.0.0.1:5555/posts",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Post created successfully", response.data);
//     } catch (error) {
//       console.error("Error creating post", error);
//       setFieldError("content_text", "Error creating post");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!friendProfile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{friendProfile.username}'s Profile</h2>
//       {isFriends ? (
//         <button onClick={() => setShowPostForm(!showPostForm)}>
//           {showPostForm ? "Hide Post Form" : "Create Post"}
//         </button>
//       ) : (
//         <div>
//           <p>
//             You must be friends with {friendProfile.username} to create a post.
//           </p>
//           <button onClick={handleAddFriend}>Add Friend</button>
//         </div>
//       )}
//       {console.log("Author ID:", userId)}
//       {showPostForm && userId !== null && (
//         <PostForm
//           onSubmit={(values, actions) => handleSubmit(values, actions, userId)}
//           authorId={userId}
//         />
//       )}

//       <Posts recipientId={friendId} />
//     </div>
//   );
// };

// export default UserProfile;

// with form working
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import PostForm from "./PostForm";
// import Posts from "./Posts";

// const UserProfile = ({ match }) => {
//   const { friendId } = match.params;
//   const [friendProfile, setFriendProfile] = useState(null);
//   const [showPostForm, setShowPostForm] = useState(false);
//   const [isFriends, setIsFriends] = useState(false);
//   const [userId, setUserId] = useState(null);

//   // Define fetchFriendProfile outside of useEffect
//   const fetchFriendProfile = async () => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:5555/users/${friendId}`
//       );
//       setFriendProfile(response.data.user);

//       // Check if the logged-in user is friends with the person
//       // whose profile they are viewing
//       const token = localStorage.getItem("access_token");
//       const loggedInUserId = localStorage.getItem("user_id");

//       if (loggedInUserId) {
//         const friendsResponse = await axios.get(
//           `http://127.0.0.1:5555/users/${loggedInUserId}/friends`
//         );

//         const friendsIds = friendsResponse.data.friends.map(
//           (friend) => friend.id
//         );
//         setIsFriends(friendsIds.includes(response.data.user.id));
//         setUserId(loggedInUserId); // Set userId here
//       }
//     } catch (error) {
//       console.error("Error fetching friend profile", error);
//     }
//   };

//   // Add user as friend
//   const handleAddFriend = async () => {
//     try {
//       const token = localStorage.getItem("access_token");
//       const response = await axios.post(
//         `http://127.0.0.1:5555/users/${userId}/friends`,
//         { friend_id: friendId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // If the friend request is sent successfully, update state
//       setIsFriends(true);
//       console.log(`Friend request sent to user with ID ${friendId}`);
//     } catch (error) {
//       console.error("Error sending friend request", error);
//     }
//   };

//   // Function to handle post submission
//   const handlePostSubmit = async (values, { setSubmitting, setFieldError }) => {
//     if (!isFriends) {
//       setFieldError(
//         "postContent",
//         `Must be friends with ${friendProfile?.username} to create a post.`
//       );
//       setSubmitting(false);
//       return;
//     }

//     const token = localStorage.getItem("access_token");

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5555/posts",
//         {
//           content_text: values.postContent,
//           author_id: userId,
//           recipient_id: values.recipientId,
//           content_image: values.postImage,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Handle success, if needed
//       console.log("Post created successfully", response.data);

//       // Reset the form and hide the post form
//       setShowPostForm(false);
//     } catch (error) {
//       console.error("Error creating post", error);
//       setFieldError("postContent", "Error creating post");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     fetchFriendProfile();
//   }, [friendId]);

//   return (
//     <div>
//       <h2>{friendProfile?.username}'s Profile</h2>
//       {isFriends ? (
//         <button onClick={() => setShowPostForm(!showPostForm)}>
//           {showPostForm ? "Hide Post Form" : "Create Post"}
//         </button>
//       ) : (
//         <div>
//           <p>
//             You must be friends with {friendProfile?.username} to create a post.
//           </p>
//           <button onClick={handleAddFriend}>Add Friend</button>
//         </div>
//       )}

//       {showPostForm && userId !== null && (
//         <PostForm
//           onSubmit={handlePostSubmit}
//           authorId={userId}
//           friends={[friendProfile]}
//         />
//       )}

//       <Posts recipientId={friendId} />
//     </div>
//   );
// };

// export default UserProfile;

//with autorecipient
// UserProfile.js
// UserProfile.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, Alert } from "react-bootstrap";
// import PostForm from "./PostForm";
// import Posts from "./Posts";

// const UserProfile = ({ match }) => {
//   const { friendId } = match.params;
//   const [friendProfile, setFriendProfile] = useState(null);
//   const [showPostForm, setShowPostForm] = useState(false);
//   const [isFriends, setIsFriends] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [recipientId, setRecipientId] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null); // New state for success message

//   const fetchFriendProfile = async () => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:5555/users/${friendId}`
//       );
//       setFriendProfile(response.data.user);
//       setRecipientId(response.data.user.id);

//       const token = localStorage.getItem("access_token");
//       const loggedInUserId = localStorage.getItem("user_id");

//       if (loggedInUserId) {
//         const friendsResponse = await axios.get(
//           `http://127.0.0.1:5555/users/${loggedInUserId}/friends`
//         );
//         const friendsIds = friendsResponse.data.friends.map(
//           (friend) => friend.id
//         );
//         setIsFriends(friendsIds.includes(response.data.user.id));
//         setUserId(loggedInUserId);
//       }
//     } catch (error) {
//       console.error("Error fetching friend profile", error);
//     }
//   };

//   const handleAddFriend = async () => {
//     try {
//       const token = localStorage.getItem("access_token");
//       await axios.post(
//         `http://127.0.0.1:5555/users/${userId}/friends`,
//         { friend_id: friendId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setIsFriends(true);
//       console.log(`Friend request sent to user with ID ${friendId}`);
//     } catch (error) {
//       console.error("Error sending friend request", error);
//     }
//   };

//   const handlePostSubmit = async (values, actions) => {
//     console.log("Post form values:", values);

//     const token = localStorage.getItem("access_token");

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5555/posts",
//         {
//           content_text: values.postContent,
//           author_id: userId,
//           recipient_id: values.recipientId,
//           content_image: values.postImage,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Post created successfully", response.data);

//       setSuccessMessage("Post created successfully");

//       window.location.reload();

//       setShowPostForm(false);
//     } catch (error) {
//       console.error("Error creating post", error);
//       actions.setFieldError("postContent", "Error creating post");
//     } finally {
//       actions.setSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     fetchFriendProfile();
//   }, [friendId]);

//   return (
//     <div>
//       <h2>{friendProfile?.username}'s Profile</h2>
//       {successMessage && (
//         <Alert
//           variant="success"
//           onClose={() => setSuccessMessage(null)}
//           dismissible
//         >
//           {successMessage}
//         </Alert>
//       )}
//       {isFriends ? (
//         <Button
//           variant="primary"
//           onClick={() => setShowPostForm(!showPostForm)}
//         >
//           {showPostForm ? "Hide Post Form" : "Create Post"}
//         </Button>
//       ) : (
//         <div>
//           <p>
//             You must be friends with {friendProfile?.username} to create a post.
//           </p>
//           <Button variant="success" onClick={handleAddFriend}>
//             Add Friend
//           </Button>
//         </div>
//       )}

//       {showPostForm && userId !== null && (
//         <PostForm
//           onSubmit={handlePostSubmit}
//           authorId={userId}
//           friends={[friendProfile]}
//           initialRecipientId={recipientId}
//         />
//       )}

//       <Posts recipientId={friendId} />
//     </div>
//   );
// };

// export default UserProfile;

//with comments
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import PostForm from "./PostForm";
import Posts from "./Posts";

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
      <h2>{friendProfile?.username}'s Profile</h2>
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
        <Button
          variant="primary"
          onClick={() => setShowPostForm(!showPostForm)}
        >
          {showPostForm ? "Hide Post Form" : "Create Post"}
        </Button>
      ) : (
        <div>
          <p>
            You must be friends with {friendProfile?.username} to create a post.
          </p>
          <Button variant="success" onClick={handleAddFriend}>
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
