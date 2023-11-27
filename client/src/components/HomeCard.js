import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeCard = ({ user, loggedInUserId }) => {
  return (
    <Card key={user.id} style={{ width: "18rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title>
          <Link to={`/profile/${user.id}`}>{user.username}</Link>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default HomeCard;
