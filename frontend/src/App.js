import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from './pages/Home/Home';
import Navbar from "./components/Navbar/Navbar";
import SinglePost from "./pages/SinglePost/SinglePost";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import CreatePostPage from "./pages/CreatePost/CreatePostPage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <main className="app">
      <Navbar />
      <Routes>
        <Route element={<PersistLogin />}> 
          <Route path="/" element={<Home />} />
          <Route path="/posts/:postId" element={<SinglePost />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/create-post" element={<CreatePostPage />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
