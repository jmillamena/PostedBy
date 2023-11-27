import React, { useState, useEffect } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import HomeCard from "./HomeCard"; // Import the new component
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5555/users")
      .then((response) => {
        if (!response.data || !response.data.users) {
          throw new Error("Invalid response from server");
        }
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
        setUsers([]);
      });

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
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <div>
        {filteredUsers.map(
          (user) =>
            user.id !== loggedInUserId && (
              <HomeCard
                key={user.id}
                user={user}
                loggedInUserId={loggedInUserId}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Home;
