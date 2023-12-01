import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./homestyle.css";

const DeletePost = ({ postId, onDelete, userId }) => {
  const [deleteMessage, setDeleteMessage] = useState(null);

  const handleDelete = async () => {
    try {
      // Make a DELETE request to your API endpoint
      const response = await axios.delete(
        `http://127.0.0.1:5555/deletepost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // Handle the response and update the component state
      setDeleteMessage(response.data.message);

      // Call the onDelete function to update the parent component's state
      onDelete(postId);
    } catch (error) {
      console.error("Error deleting post", error);
      setDeleteMessage("Error deleting post");
    }
  };

  return (
    <div>
      <Button className="delete-button" variant="danger" onClick={handleDelete}>
        Delete Post
      </Button>
      {deleteMessage && <p>{deleteMessage}</p>}
    </div>
  );
};

export default DeletePost;
