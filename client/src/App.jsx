import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Meet from "./pages/Meet.jsx";
import ReadyMeet from "./pages/ReadyMeet.jsx";
import Login from "./pages/Login.jsx";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" index element={auth.data ? <Home /> : <Login />} />
      <Route path="/meet" element={auth.data ? <ReadyMeet /> : <Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
