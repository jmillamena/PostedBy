// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { useAuth } from "./App"; // Import your authentication context

// const YourPosts = () => {
//   const { userId } = useAuth(); // Assuming your authentication context provides userId
//   const [userPosts, setUserPosts] = useState([]);

//   useEffect(() => {
//     const fetchUserPosts = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:5555/getpostsbyauthorid/${userId}`, // Use userId here
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             },
//           }
//         );
//         setUserPosts(response.data.posts);
//       } catch (error) {
//         console.error("Error fetching user posts", error);
//       }
//     };

//     fetchUserPosts();
//   }, [userId]);

//   const sortedPosts = userPosts.sort(
//     (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//   );

//   return (
//     <Container>
//       <h2>Your Posts</h2>
//       <Row>
//         {userPosts.map((post) => (
//           <Col key={post.id} xs={12} md={4} className="mb-3">
//             <Card>
//               <Card.Img
//                 variant="top"
//                 src={post.content_image}
//                 alt="Post Image"
//                 style={{ objectFit: "cover", height: "200px" }}
//               />
//               <Card.Body>
//                 <Card.Text style={{ margin: "0", padding: "0" }}>
//                   {post.content_text}
//                 </Card.Text>
//                 <Card.Text style={{ margin: "0", padding: "0" }}>
//                   Posted by you
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default YourPosts;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { useAuth } from "./App";
// import DeletePost from "./DeletePost";
// import EditPost from "./EditPost";

// const YourPosts = () => {
//   const { userId } = useAuth();
//   const [userPosts, setUserPosts] = useState([]);

//   useEffect(() => {
//     const fetchUserPosts = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:5555/getpostsbyauthorid/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             },
//           }
//         );
//         setUserPosts(response.data.posts);
//       } catch (error) {
//         console.error("Error fetching user posts", error);
//       }
//     };

//     fetchUserPosts();
//   }, [userId]);

//   const handleEdit = (postId, newContentText) => {
//     // Update the state to reflect the edited post
//     setUserPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId ? { ...post, content_text: newContentText } : post
//       )
//     );
//   };

//   const handleDelete = (postId) => {
//     // Update the state to remove the deleted post
//     setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
//   };

//   // Sort posts by timestamp (newest to oldest)
//   const sortedPosts = userPosts.sort(
//     (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//   );

//   return (
//     <Container>
//       <h2>PostedBy You</h2>
//       <Row>
//         {sortedPosts.map((post) => (
//           <Col key={post.id} xs={12} md={4} className="mb-3">
//             <Card>
//               <Card.Img
//                 variant="top"
//                 src={post.content_image}
//                 alt="Post Image"
//                 style={{ objectFit: "cover", height: "200px" }}
//               />
//               <Card.Body>
//                 <Card.Text style={{ margin: "0", padding: "0" }}>
//                   {post.content_text}
//                 </Card.Text>
//                 <Card.Text style={{ margin: "0", padding: "0" }}>
//                   PostedOn{" "}
//                   {post.recipient ? (
//                     <Link to={`/profile/${post.recipient.id}`}>
//                       {post.recipient.username}
//                     </Link>
//                   ) : (
//                     "Unknown user"
//                   )}
//                 </Card.Text>
//                 <EditPost postId={post.id} onUpdate={handleEdit} />
//                 <DeletePost
//                   postId={post.id}
//                   onDelete={handleDelete}
//                   userId={userId}
//                 />
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default YourPosts;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useAuth } from "./App";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

const YourPosts = () => {
  const { userId } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [editFormsVisible, setEditFormsVisible] = useState({});

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5555/getpostsbyauthorid/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setUserPosts(response.data.posts);
        // Initialize edit form visibility state for each post
        setEditFormsVisible(
          response.data.posts.reduce(
            (acc, post) => ({ ...acc, [post.id]: false }),
            {}
          )
        );
      } catch (error) {
        console.error("Error fetching user posts", error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  const handleEdit = (postId, newContentText, newContentImage) => {
    // Update the state to reflect the edited post
    setUserPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              content_text: newContentText,
              content_image: newContentImage,
            }
          : post
      )
    );
  };

  const handleDelete = (postId) => {
    // Update the state to remove the deleted post
    setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const toggleEditForm = (postId) => {
    // Toggle the visibility of the edit form for the specified post
    setEditFormsVisible((prevVisibility) => ({
      ...prevVisibility,
      [postId]: !prevVisibility[postId],
    }));
  };

  // Sort posts by timestamp (newest to oldest)
  const sortedPosts = userPosts.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <Container>
      <h2>PostedBy You</h2>
      <Row>
        {sortedPosts.map((post) => (
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
                  PostedOn{" "}
                  {post.recipient ? (
                    <Link to={`/profile/${post.recipient.id}`}>
                      {post.recipient.username}
                    </Link>
                  ) : (
                    "Unknown user"
                  )}
                </Card.Text>
                <button onClick={() => toggleEditForm(post.id)}>
                  {editFormsVisible[post.id] ? "Close Edit Form" : "Edit Post"}
                </button>
                {editFormsVisible[post.id] && (
                  <EditPost postId={post.id} onUpdate={handleEdit} />
                )}
                <DeletePost
                  postId={post.id}
                  onDelete={handleDelete}
                  userId={userId}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default YourPosts;
