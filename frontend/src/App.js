import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from './pages/Home/Home';
import Navbar from "./components/Navbar/Navbar";
import SinglePost from "./pages/SinglePost/SinglePost";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
