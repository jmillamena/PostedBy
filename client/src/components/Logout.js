// import React from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// const Logout = () => {
//   const history = useHistory();

//   const handleLogout = async () => {
//     try {
//       const accessToken = localStorage.getItem("access_token");

//       if (accessToken) {
//         await axios.post(
//           "http://127.0.0.1:5555/logout",
//           {},
//           {
//             headers: {
//               Authorization: `Bearer  localStorage.getItem("access_token")`,
//             },
//           }
//         );

//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//         localStorage.removeItem("user_name");
//         localStorage.removeItem("user_id");

//         // Redirect to the login page
//         history.push("/login");
//       } else {
//         console.log("User is not logged in");
//       }
//     } catch (error) {
//       console.error("Logout error", error);
//     }
//   };

//   return (
//     <div>
//       <p>Logout</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Logout;

//edits with useAuth

import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "./App";
import axios from "axios";

const Logout = () => {
  const { setIsLoggedIn, setUserName, setUserId } = useAuth();

  useEffect(() => {
    // Function to perform backend logout
    const backendLogout = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        await axios.post(
          "http://127.0.0.1:5555/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Backend logout failed:", error);
      }
    };

    // Perform local logout
    const handleLogout = () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_id");

      setIsLoggedIn(false);
      setUserName("");
      setUserId();

      backendLogout();
    };

    handleLogout();
  }, [setIsLoggedIn, setUserName, setUserId]);

  return <Redirect to="/login" />;
};

export default Logout;
