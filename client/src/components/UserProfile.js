// UserProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = ({ match }) => {
  const { friendId } = match.params;
  const [friendProfile, setFriendProfile] = useState(null);

  useEffect(() => {
    const fetchFriendProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5555/users/${friendId}`
        );
        setFriendProfile(response.data.user);
      } catch (error) {
        console.error("Error fetching friend profile", error);
      }
    };

    fetchFriendProfile();
  }, [friendId]);

  if (!friendProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{friendProfile.username}'s Profile</h2>
    </div>
  );
};

export default UserProfile;
