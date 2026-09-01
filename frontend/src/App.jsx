import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/home";
import { dataContext } from "./context/UserContext";

function App() {
  const { userData, loading } = useContext(dataContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          userData ? (
            <Home />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;