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

      setEditMessage(response.data.message);

      onUpdate(postId, newContentText, newContentImage);

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
