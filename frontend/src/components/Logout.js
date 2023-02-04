import React, { useEffect } from "react";


const Logout = () => {

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch("http://localhost:9103/intelliq_api/logout", {
          method: "POST",
          headers: {
            "X-OBSERVATORY-AUTH": localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        localStorage.removeItem("token");
        window.location.href = "/login";
      } catch (error) {
        console.error(error);
      }
    };

    logout();
  }, []);

  
  return <div>Logging out...</div>;
};

export default Logout;
