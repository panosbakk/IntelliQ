import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      try {
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
