//auto update comment

// PostComment.js

// import React, { useState } from "react";
// import axios from "axios";
// import { Alert } from "react-bootstrap";

// const PostComment = ({ post_id, isAuthenticated, onCommentSubmit }) => {
//   const [comment, setComment] = useState("");
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleCommentSubmit = async () => {
//     if (!isAuthenticated) {
//       console.log(
//         "User is not authenticated. Redirect to login or show a message."
//       );
//       return;
//     }
//     if (comment.trim() === "") {
//       console.log("Comment cannot be blank.");
//       window.alert("Comment must not be blank.");

//       return;
//     }

//     try {
//       await axios.post(
//         `/postcomment/${post_id}`,
//         { content: comment },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       );

//       setComment("");
//       setSuccessMessage("Comment added successfully");

//       if (onCommentSubmit) {
//         onCommentSubmit(post_id);
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   return (
//     <div>
//       {successMessage && (
//         <Alert
//           variant="success"
//           onClose={() => setSuccessMessage(null)}
//           dismissible
//         >
//           {successMessage}
//         </Alert>
//       )}
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

//changes with react

import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

const PostComment = ({ post_id, isAuthenticated, onCommentSubmit }) => {
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCommentSubmit = async () => {
    if (!isAuthenticated) {
      console.log(
        "User is not authenticated. Redirect to login or show a message."
      );
      return;
    }

    // Check if the comment is blank
    if (comment.trim() === "") {
      setErrorMessage("Comment must not be blank.");
      return;
    }

    try {
      await axios.post(
        `/postcomment/${post_id}`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setComment("");
      setSuccessMessage("Comment added successfully");

      if (onCommentSubmit) {
        onCommentSubmit(post_id);
      }
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

      {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage(null)}
          dismissible
        >
          {errorMessage}
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
