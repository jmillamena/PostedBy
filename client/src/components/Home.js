// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function Home() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:5555/users")
//       .then((r) => {
//         if (r.ok) {
//           return r.json();
//         }
//         throw r;
//       })
//       .then((data) => {
//         // Ensure that data.users is an array
//         const fetchedUsers = Array.isArray(data.users) ? data.users : [];
//         setUsers(fetchedUsers);
//       })
//       .catch((error) => {
//         console.error("Error fetching users", error);
//         setUsers([]); // Set users to an empty array in case of an error
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Explore Users</h2>
//       <div>
//         {users.map((user) => (
//           <div className="users" key={user.id}>
//             {/* Use Link to make the username clickable */}
//             <Link to={`/profile/${user.id}`}>
//               <p>{user.username}</p>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

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

  return (
    <div>
      <h2>Explore Users</h2>
      <div>
        {users.map(
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
