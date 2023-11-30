//png
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
// const PostForLoggedIn = ({ userId }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:5555/getpostsbyuserid/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             },
//           }
//         );

//         const postsCopy = [...response.data.posts];
//         const sortedPosts = postsCopy.sort((a, b) => {
//           return new Date(b.timestamp) - new Date(a.timestamp);
//         });

//         setPosts(sortedPosts);
//       } catch (error) {
//         console.error("Error fetching posts", error);
//       }
//     };

//     fetchPosts();
//   }, [userId]);

//   const getPostImage = (post) => {
//     return post.content_image || "/PostedBy.png";
//   };

//   return (
//     <Container>
//       <h2>Posts</h2>
//       <Row>
//         {posts.map((post) => (
//           <Col key={post.id} xs={12} md={4} className="mb-3">
//             <Card>
//               <Card.Img
//                 variant="top"
//                 src={getPostImage(post)}
//                 alt="Post Image"
//                 style={{ objectFit: "cover", height: "200px" }}
//               />
//               <Card.Body>
//                 <Card.Text style={{ margin: "0", padding: "0" }}>
//                   {post.content_text}
//                 </Card.Text>
//                 <Card.Text style={{ margin: "0", padding: "0" }}>
//                   PostedBy{" "}
//                   <Link to={`/profile/${post.author.id}`}>
//                     {post.author.username}
//                   </Link>
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default PostForLoggedIn;

//NEW WITH COMMENT SUBMISSION

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Comment from "./Comment";
// import PostComment from "./PostComment";

// const PostForLoggedIn = ({ userId }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:5555/getpostsbyuserid/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             },
//           }
//         );

//         const postsCopy = [...response.data.posts];
//         const sortedPosts = postsCopy.sort((a, b) => {
//           return new Date(b.timestamp) - new Date(a.timestamp);
//         });

//         setPosts(sortedPosts);
//       } catch (error) {
//         console.error("Error fetching posts", error);
//       }
//     };

//     fetchPosts();
//   }, [userId]);

//   const getPostImage = (post) => {
//     return post.content_image || "/PostedBy.png";
//   };

//   return (
//     <Container>
//       <h2>Posts</h2>
//       <Row>
//         {posts.map((post) => (
//           <Col key={post.id} xs={12} md={4} className="mb-3">
//             <Card>
//               <Card.Img
//                 variant="top"
//                 src={getPostImage(post)}
//                 alt="Post Image"
//                 style={{ objectFit: "cover", height: "200px" }}
//               />
//               <Card.Body>
//                 <Card.Text style={{ margin: "0", padding: "0" }}>
//                   {post.content_text}
//                 </Card.Text>
//                 <Card.Text style={{ margin: "0", padding: "0" }}>
//                   PostedBy{" "}
//                   <Link to={`/profile/${post.author.id}`}>
//                     {post.author.username}
//                   </Link>
//                 </Card.Text>

//                 {/* Display comments using the Comment component */}
//                 {post.comments &&
//                   post.comments.map((comment) => (
//                     <Comment
//                       key={comment.id}
//                       content={comment.content}
//                       user={comment.user}
//                     />
//                   ))}

//                 {/* Add comment form */}
//                 <PostComment post_id={post.id} isAuthenticated={true} />
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default PostForLoggedIn;

//WITH COMMENTS DISPLAYING

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Comment from "./Comment";
// import PostComment from "./PostComment";

// const PostForLoggedIn = ({ userId }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:5555/getpostsbyuserid/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             },
//           }
//         );

//         const postsCopy = [...response.data.posts];
//         const sortedPosts = postsCopy.sort((a, b) => {
//           return new Date(b.timestamp) - new Date(a.timestamp);
//         });

//         setPosts(sortedPosts);
//       } catch (error) {
//         console.error("Error fetching posts", error);
//       }
//     };

//     fetchPosts();
//   }, [userId]);

//   const getPostImage = (post) => {
//     return post.content_image || "/PostedBy.png";
//   };

//   const handleToggleComments = async (postId) => {
//     try {
//       const commentsResponse = await axios.get(
//         `http://127.0.0.1:5555/getcomments/${postId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       );

//       const updatedPosts = posts.map((post) => {
//         if (post.id === postId) {
//           return {
//             ...post,
//             showComments: !post.showComments,
//             comments: commentsResponse.data.comments.reverse(),
//           };
//         }
//         return post;
//       });

//       setPosts(updatedPosts);
//     } catch (error) {
//       console.error(`Error fetching comments for post ${postId}:`, error);
//     }
//   };

//   return (
//     <Container>
//       <h2>Posts</h2>
//       <Row>
//         {posts.map((post) => (
//           <Col key={post.id} xs={12} md={4} className="mb-3">
//             <Card>
//               <Card.Img
//                 variant="top"
//                 src={getPostImage(post)}
//                 alt="Post Image"
//                 style={{ objectFit: "cover", height: "200px" }}
//               />
//               <Card.Body>
//                 <Card.Text style={{ margin: "0", padding: "0" }}>
//                   {post.content_text}
//                 </Card.Text>
//                 <Card.Text style={{ margin: "0", padding: "0" }}>
//                   PostedBy{" "}
//                   <Link to={`/profile/${post.author.id}`}>
//                     {post.author.username}
//                   </Link>
//                 </Card.Text>

//                 {/* Display comments using the Comment component */}
//                 {post.showComments && (
//                   <div
//                     className="scrollComment"
//                     style={{ maxHeight: "100px", overflowY: "auto" }}
//                   >
//                     {post.comments &&
//                       post.comments.map((comment) => (
//                         <Comment
//                           key={comment.id}
//                           content={comment.content}
//                           user={comment.user}
//                         />
//                       ))}
//                   </div>
//                 )}

//                 {/* Toggle comment visibility */}
//                 <Button
//                   variant="primary"
//                   onClick={() => handleToggleComments(post.id)}
//                 >
//                   {post.showComments ? "Hide Comments" : "Show Comments"}
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default PostForLoggedIn;

//comments and form
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import PostComment from "./PostComment";

const PostForLoggedIn = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5555/getpostsbyuserid/${userId}`,
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
  }, [userId]);

  const getPostImage = (post) => {
    return post.content_image || "/PostedBy.png";
  };

  const fetchComments = async (postId) => {
    try {
      const commentsResponse = await axios.get(
        `http://127.0.0.1:5555/getcomments/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: commentsResponse.data.comments.reverse(),
          };
        }
        return post;
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
    }
  };

  const handleToggleCommentForm = async (postId) => {
    if (!posts.find((post) => post.id === postId).comments) {
      await fetchComments(postId);
    }

    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === postId
          ? { ...post, showCommentForm: !post.showCommentForm }
          : post
      );

      return updatedPosts;
    });
  };

  return (
    <Container>
      <h2>Posts</h2>
      <Row>
        {posts.map((post) => (
          <Col key={post.id} xs={12} md={4} className="mb-3">
            <Card>
              <Card.Img
                variant="top"
                src={getPostImage(post)}
                alt="Post Image"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <Card.Body>
                <Card.Text style={{ margin: "0", padding: "0" }}>
                  {post.content_text}
                </Card.Text>
                <Card.Text style={{ margin: "0", padding: "0" }}>
                  PostedBy{" "}
                  <Link to={`/profile/${post.author.id}`}>
                    {post.author.username}
                  </Link>
                </Card.Text>

                {/* Display comments using the Comment component */}
                <p>Comments:</p>
                <div
                  className="scrollComment"
                  style={{ maxHeight: "100px", overflowY: "auto" }}
                >
                  {post.comments &&
                    post.comments.map((comment) => (
                      <Comment
                        key={comment.id}
                        content={comment.content}
                        user={comment.user}
                      />
                    ))}
                </div>

                {/* Comment Form */}
                {post.showCommentForm && (
                  <PostComment
                    post_id={post.id}
                    isAuthenticated={true}
                    onCommentSubmit={async () => {
                      await handleToggleCommentForm(post.id);
                      await fetchComments(post.id);
                    }}
                  />
                )}

                {/* Toggle comment form visibility */}
                <Button
                  variant="primary"
                  onClick={() => handleToggleCommentForm(post.id)}
                >
                  {post.showCommentForm ? "Hide Comment Form" : "Comment"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostForLoggedIn;
