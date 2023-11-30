// Comment.js

import React from "react";
import { Card } from "react-bootstrap";

const Comment = ({ content, user }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text>{content}</Card.Text>
        <Card.Text>
          Comment by {user ? user.username : "Unknown User"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
