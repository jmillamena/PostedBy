// Comment.js

import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styling.css";

const Comment = ({ content, user }) => {
  return (
    <Card className="comments">
      <Card.Body>
        <Card.Text>{content}</Card.Text>
        <Card.Text>
          Comment by{" "}
          {user ? (
            <Link to={`/profile/${user.id}`}>{user.username}</Link>
          ) : (
            "Unknown User"
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
