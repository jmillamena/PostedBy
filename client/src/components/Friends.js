// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Friends = ({ userId }) => {
//   const token = localStorage.getItem("access_token");
//   console.log("UserId:", userId);

//   const [friends, setFriends] = useState([]);

//   useEffect(() => {
//     console.log("Effect triggered. UserId:", userId);
//     if (userId) {
//       fetchFriends();
//     }
//   }, [userId, token]);

//   const fetchFriends = async () => {
//     console.log("Fetching friends for UserId:", userId);
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:5555/users/${userId}/friends`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setFriends(response.data.friends);
//     } catch (error) {
//       console.error("Error fetching friends", error);
//     }
//   };

//   if (!userId) {
//     return <div>Loading...</div>; // or another loading indicator
//   }

//   return (
//     <div>
//       <h2>Friends</h2>
//       <ul>
//         {friends.map((friend) => (
//           <li key={friend.id}>{friend.username}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Friends;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Friends = ({ userId, token }) => {
  const [friends, setFriends] = useState([]);

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

  const handleViewProfile = (friendId) => {
    // You can navigate to the friend's profile page using react-router-dom or any other method
    console.log(`Viewing profile of friend with ID: ${friendId}`);
  };

  return (
    <div>
      <h2>Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <Link to={`/profile/${friend.id}`}>{friend.username}</Link>
            {/* Add a button or link to the friend's profile page */}
            <button onClick={() => handleViewProfile(friend.id)}>
              View Profile
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;