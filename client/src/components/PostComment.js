// import React, { useState } from "react";
// import axios from "axios";

// const PostComment = ({ post_id, isAuthenticated, authToken }) => {
//   const [comment, setComment] = useState("");

//   const handleCommentSubmit = async () => {
//     if (!isAuthenticated) {
//       // Handle the case where the user is not authenticated
//       console.log(
//         "User is not authenticated. Redirect to login or show a message."
//       );
//       return;
//     }

//     try {
//       // Make a POST request to your API endpoint for adding comments
//       await axios.post(
//         `/postcomment/${post_id}`,
//         { content: comment },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include the authorization token
//           },
//         }
//       );

//       // Clear the comment input after submission
//       setComment("");

//       // Optionally, you can update the state or trigger a refresh of comments
//       // e.g., by fetching the updated comments and updating the component state
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   return (
//     <div>
//       <textarea
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="Type your comment here..."
//       />
//       <button onClick={handleCommentSubmit}>Submit Comment</button>
//     </div>
//   );
// };

// export default PostComment;
//
//with success message
import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

const PostComment = ({ post_id, isAuthenticated, authToken }) => {
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message

  const handleCommentSubmit = async () => {
    if (!isAuthenticated) {
      // Handle the case where the user is not authenticated
      console.log(
        "User is not authenticated. Redirect to login or show a message."
      );
      return;
    }

    try {
      // Make a POST request to your API endpoint for adding comments
      await axios.post(
        `/postcomment/${post_id}`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include the authorization token
          },
        }
      );

      // Clear the comment input after submission
      setComment("");

      // Set success message
      setSuccessMessage("Comment added successfully");

      // Optionally, you can update the state or trigger a refresh of comments
      // e.g., by fetching the updated comments and updating the component state
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage(null)}
          dismissible
        >
          {successMessage}
        </Alert>
      )}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Type your comment here..."
      />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
    </div>
  );
};

export default PostComment;
