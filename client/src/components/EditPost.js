// import React, { useState } from "react";
// import axios from "axios";

// const EditPost = ({ postId, onUpdate }) => {
//   const [newContentText, setNewContentText] = useState("");
//   const [newContentImage, setNewContentImage] = useState("");
//   const [editMessage, setEditMessage] = useState(null);

//   const handleEdit = async () => {
//     try {
//       // Make a PATCH request to your API endpoint
//       const response = await axios.patch(
//         `http://127.0.0.1:5555/editpost/${postId}`,
//         {
//           content_text: newContentText,
//           content_image: newContentImage,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       );

//       setEditMessage(response.data.message);

//       onUpdate(postId, newContentText, newContentImage);

//       setNewContentText("");
//       setNewContentImage("");
//     } catch (error) {
//       console.error("Error editing post", error);
//       setEditMessage("Error editing post");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="New content text"
//         value={newContentText}
//         onChange={(e) => setNewContentText(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="New content image URL"
//         value={newContentImage}
//         onChange={(e) => setNewContentImage(e.target.value)}
//       />
//       <button onClick={handleEdit}>Edit Post</button>
//       {editMessage && <p>{editMessage}</p>}
//     </div>
//   );
// };

// export default EditPost;

//styling
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "./homestyle.css";

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
    <Form>
      <br />
      <Form.Group controlId="newContentText">
        <Form.Label>New Message:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter new message"
          value={newContentText}
          onChange={(e) => setNewContentText(e.target.value)}
        />
      </Form.Group>
      <br />

      <Form.Group controlId="newContentImage">
        <Form.Label>New Image:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter new image URL"
          value={newContentImage}
          onChange={(e) => setNewContentImage(e.target.value)}
        />
      </Form.Group>
      <br />

      <Button
        className="custom-submit-button"
        variant="primary"
        onClick={handleEdit}
      >
        Edit Post
      </Button>

      {editMessage && <Alert variant="info">{editMessage}</Alert>}
    </Form>
  );
};

export default EditPost;
