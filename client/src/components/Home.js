import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users || []);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
        setUsers([]);
      });

    // Fetch the ID of the logged-in user from local storage
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setLoggedInUserId(Number(storedUserId));
    }
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Explore Users</h2>
      <div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {filteredUsers.map(
          (user) =>
            // Exclude the logged-in user from the list
            user.id !== loggedInUserId && (
              <div className="users" key={user.id}>
                <Link to={`/profile/${user.id}`}>
                  <p>{user.username}</p>
                </Link>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Home;
