// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Posts = ({ recipientId }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     console.log("Recipient ID:", recipientId);
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:5555/getpostsbyrecipient/${recipientId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             },
//           }
//         );
//         console.log("Recipient ID:", recipientId);
//         console.log("Posts Data:", response.data.posts);
//         const postsCopy = [...response.data.posts];

//         // posts from new to old
//         const sortedPosts = postsCopy.sort((a, b) => {
//           return new Date(b.timestamp) - new Date(a.timestamp);
//         });

//         setPosts(sortedPosts);
//       } catch (error) {
//         console.error("Error fetching posts", error);
//       }
//     };

//     fetchPosts();
//   }, [recipientId]);

//   return (
//     <div>
//       <h2>Posts</h2>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>
//             <div>
//               <p>{post.content_text}</p>
//               {post.content_image && (
//                 <img src={post.content_image} alt="Post Image" />
//               )}
//               <p>Postedby {post.author.username}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Posts;

//with styling

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Row, Col } from "react-bootstrap";

// const Posts = ({ recipientId }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:5555/getpostsbyrecipient/${recipientId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             },
//           }
//         );
//         const postsCopy = [...response.data.posts];

//         // Sort posts from new to old
//         const sortedPosts = postsCopy.sort((a, b) => {
//           return new Date(b.timestamp) - new Date(a.timestamp);
//         });

//         setPosts(sortedPosts);
//       } catch (error) {
//         console.error("Error fetching posts", error);
//       }
//     };

//     fetchPosts();
//   }, [recipientId]);

//   return (
//     <div>
//       <h2>Posts</h2>
//       <Row xs={1} md={3} className="g-4">
//         {posts.map((post) => (
//           <Col key={post.id}>
//             <Card style={{ width: "18rem" }}>
//               {post.content_image && (
//                 <Card.Img
//                   variant="top"
//                   src={post.content_image}
//                   alt="Post Image"
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//               )}
//               <Card.Body style={{ height: "200px", overflow: "hidden" }}>
//                 <Card.Text>{post.content_text}</Card.Text>
//                 <Card.Text>Posted by {post.author.username}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default Posts;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

const Posts = ({ recipientId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5555/getpostsbyrecipient/${recipientId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const postsCopy = [...response.data.posts];
        const sortedPosts = postsCopy.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, [recipientId]);

  return (
    <Container>
      <h2>Posts</h2>
      <Row>
        {posts.map((post) => (
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

export default Posts;
