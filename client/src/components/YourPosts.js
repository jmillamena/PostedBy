import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useAuth } from "./App"; // Import your authentication context

const YourPosts = () => {
  const { userId } = useAuth(); // Assuming your authentication context provides userId
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5555/getpostsbyauthorid/${userId}`, // Use userId here
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setUserPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching user posts", error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <Container>
      <h2>Your Posts</h2>
      <Row>
        {userPosts.map((post) => (
          <Col key={post.id} xs={12} md={4} className="mb-3">
            <Card>
              <Card.Img
                variant="top"
                src={post.content_image}
                alt="Post Image"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <Card.Body>
                <Card.Text style={{ margin: "0", padding: "0" }}>
                  {post.content_text}
                </Card.Text>
                <Card.Text style={{ margin: "0", padding: "0" }}>
                  Posted by {post.author.username}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default YourPosts;