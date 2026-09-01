import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const dataContext = createContext();

function UserContext({ children }) {
  const [userData, setuserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const serverURL = "https://mern-authentication-vf0f.onrender.com";

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        serverURL + "/api/getuserdata",
        {
          withCredentials: true,
        }
      );

      console.log("USER DATA:", data);

      setuserData(data);
    } catch (error) {
      console.log("GET USER ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const value = {
    serverURL,
    userData,
    setuserData,
    getUserData,
    loading,
  };

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  );
}

export default UserContext;