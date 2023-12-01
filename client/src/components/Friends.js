import React, { useState, useEffect } from "react";
import axios from "axios";
import FriendsCard from "./FriendsCard";
import "./homestyle.css";

const Friends = ({ userId, token }) => {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (userId && token) {
      fetchFriends();
    }
  }, [userId, token]);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5555/users/${userId}/friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFriends(response.data.friends);
    } catch (error) {
      console.error("Error fetching friends", error);
    }
  };

  if (!userId || !token) {
    return <div>Loading...</div>;
  }

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <br />
      <h2 className="homeTitle">Friends</h2>
      <input
        type="text"
        placeholder="Search friends..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredFriends.map((friend) => (
          <FriendsCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
