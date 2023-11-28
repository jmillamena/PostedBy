import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = ({ recipientId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Recipient ID:", recipientId);
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
        console.log("Recipient ID:", recipientId);
        console.log("Posts Data:", response.data.posts);
        const postsCopy = [...response.data.posts];

        // Sort the copy by date in descending order
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
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>
              <p>{post.content_text}</p>
              {post.content_image && (
                <img src={post.content_image} alt="Post Image" />
              )}
              <p>Postedby {post.author.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
