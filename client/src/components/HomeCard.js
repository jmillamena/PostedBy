import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cardstyle.css";

const HomeCard = ({ user, loggedInUserId }) => {
  return (
    <Card key={user.id} style={{ width: "18rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title className="userlink">
          <Link className="userlink" to={`/profile/${user.id}`}>
            {user.username}
          </Link>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default HomeCard;
