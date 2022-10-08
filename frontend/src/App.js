import React from "react";
import { Routes, Route } from "react-router-dom";

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
          <Route path="/shared-blog" element={<Home />} />
          <Route path="/shared-blog/posts/:postId" element={<SinglePost />} />
          <Route path="/shared-blog/login" element={<LoginPage />} />
          <Route path="/shared-blog/register" element={<RegisterPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/shared-blog/create-post" element={<CreatePostPage />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
