import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from './pages/Home/Home';
import Navbar from "./components/Navbar/Navbar";
import SinglePost from "./pages/SinglePost/SinglePost";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
      </Routes>
    </>
  );
}

export default App;
