// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const UserProfile = ({ match, userId, token }) => {
//   // Move these hooks to the top level of your component
//   const [friendProfile, setFriendProfile] = useState(null);
//   const [showPostForm, setShowPostForm] = useState(false);
//   const [postContent, setPostContent] = useState("");

//   // Define fetchFriendProfile outside useEffect
//   const fetchFriendProfile = async () => {
//     try {
//       const { friendId } = match.params;
//       const response = await axios.get(
//         `http://127.0.0.1:5555/users/${friendId}`
//       );
//       setFriendProfile(response.data.user);

//       const postsResponse = await axios.get(
//         `http://127.0.0.1:5555/posts?author_id=${friendId}`
//       );
//       setFriendProfile((prevProfile) => ({
//         ...prevProfile,
//         posts: postsResponse.data,
//       }));
//     } catch (error) {
//       console.error("Error fetching friend profile", error);
//     }
//   };

//   useEffect(() => {
//     // Ensure that match and match.params are defined
//     if (!match || !match.params) {
//       return;
//     }

//     // Call fetchFriendProfile
//     fetchFriendProfile();
//   }, [match]); // Include match in the dependency array

//   const handlePostCreate = async () => {
//     try {
//       const decodeToken = jwtDecode(token);
//       const currentUserId = `${token}`;

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       await axios.post(
//         `http://127.0.0.1:5555/posts`,
//         {
//           content_text: postContent,
//           author_id: currentUserId,
//         },
//         config
//       );

//       // Call fetchFriendProfile after creating the post
//       await fetchFriendProfile();

//       setShowPostForm(false); // Hides create post form
//       setPostContent("");
//     } catch (error) {
//       console.error("Error creating post", error);
//     }
//   };

//   if (!friendProfile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{friendProfile.username}'s Profile</h2>
//       {showPostForm ? (
//         <div>
//           <textarea
//             rows="4"
//             cols="50"
//             placeholder="Enter your post content..."
//             value={postContent}
//             onChange={(e) => setPostContent(e.target.value)}
//           ></textarea>
//           <br />
//           <button onClick={handlePostCreate}>Create Post</button>
//         </div>
//       ) : (
//         <button onClick={() => setShowPostForm(true)}>Create Post</button>
//       )}
//       <h3>Posts</h3>
//       <ul>
//         {friendProfile.posts &&
//           friendProfile.posts.map((post) => (
//             <li key={post.id}>{post.content_text}</li>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default UserProfile;

//ABOVE FROM POSTS BRANCH

// UserProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostForm from "./PostForm";

const UserProfile = ({ match }) => {
  const { friendId } = match.params;
  const [friendProfile, setFriendProfile] = useState(null);

  // Define fetchFriendProfile outside of useEffect
  const fetchFriendProfile = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5555/users/${friendId}`
      );
      setFriendProfile(response.data.user);
    } catch (error) {
      console.error("Error fetching friend profile", error);
    }
  };

  useEffect(() => {
    // Call fetchFriendProfile
    fetchFriendProfile();
  }, [friendId]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
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
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default UserProfile;
