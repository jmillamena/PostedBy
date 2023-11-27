import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./cardstyle.css";

const FriendsCard = ({ friend }) => {
  return (
    <Card key={friend.id} style={{ width: "18rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title className="userlink">
          <Link className="userlink" to={`/profile/${friend.id}`}>
            {friend.username}
          </Link>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default FriendsCard;
