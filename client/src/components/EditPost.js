// import React, { useState } from "react";
// import axios from "axios";

// const EditPost = ({ postId, onUpdate }) => {
//   const [newContentText, setNewContentText] = useState("");
//   const [editMessage, setEditMessage] = useState(null);

//   const handleEdit = async () => {
//     try {
//       // Make a PATCH request to your API endpoint
//       const response = await axios.patch(
//         `http://127.0.0.1:5555/editpost/${postId}`,
//         {
//           content_text: newContentText,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       );

//       // Handle the response and update the component state
//       setEditMessage(response.data.message);

//       // Call the onUpdate function passed from the parent to update the post in the parent state
//       onUpdate(postId, newContentText);
//     } catch (error) {
//       console.error("Error editing post", error);
//       setEditMessage("Error editing post");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={newContentText}
//         onChange={(e) => setNewContentText(e.target.value)}
//       />
//       <button onClick={handleEdit}>Edit Post</button>
//       {editMessage && <p>{editMessage}</p>}
//     </div>
//   );
// };

// export default EditPost;

// import React, { useState } from "react";
// import axios from "axios";

// const EditPost = ({ postId, onUpdate }) => {
//   const [newContentText, setNewContentText] = useState("");
//   const [editMessage, setEditMessage] = useState(null);

//   const handleEdit = async () => {
//     try {
//       // Make a PATCH request to your API endpoint
//       const response = await axios.patch(
//         `http://127.0.0.1:5555/editpost/${postId}`,
//         {
//           content_text: newContentText,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       );

//       // Handle the response and update the component state
//       setEditMessage(response.data.message);

//       // Call the onUpdate function passed from the parent to update the post in the parent state
//       onUpdate(postId, newContentText);

//       // Clear the input field and reset any other state variables
//       setNewContentText("");
//     } catch (error) {
//       console.error("Error editing post", error);
//       setEditMessage("Error editing post");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={newContentText}
//         onChange={(e) => setNewContentText(e.target.value)}
//       />
//       <button onClick={handleEdit}>Edit Post</button>
//       {editMessage && <p>{editMessage}</p>}
//     </div>
//   );
// };

// export default EditPost;

import React, { useState } from "react";
import axios from "axios";

const EditPost = ({ postId, onUpdate }) => {
  const [newContentText, setNewContentText] = useState("");
  const [newContentImage, setNewContentImage] = useState("");
  const [editMessage, setEditMessage] = useState(null);

  const handleEdit = async () => {
    try {
      // Make a PATCH request to your API endpoint
      const response = await axios.patch(
        `http://127.0.0.1:5555/editpost/${postId}`,
        {
          content_text: newContentText,
          content_image: newContentImage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // Handle the response and update the component state
      setEditMessage(response.data.message);

      // Call the onUpdate function passed from the parent to update the post in the parent state
      onUpdate(postId, newContentText, newContentImage);

      // Clear the input fields and reset any other state variables
      setNewContentText("");
      setNewContentImage("");
    } catch (error) {
      console.error("Error editing post", error);
      setEditMessage("Error editing post");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="New content text"
        value={newContentText}
        onChange={(e) => setNewContentText(e.target.value)}
      />
      <input
        type="text"
        placeholder="New content image URL"
        value={newContentImage}
        onChange={(e) => setNewContentImage(e.target.value)}
      />
      <button onClick={handleEdit}>Edit Post</button>
      {editMessage && <p>{editMessage}</p>}
    </div>
  );
};

export default EditPost;
