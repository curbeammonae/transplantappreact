import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from './components/PrivateRoute';
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import Post from "./pages/Post";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import MyRecipes from "./pages/MyRecipes";


export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post/:postingId" element={<Post />} />
        <Route path="/search" element={<Search />} />
        <Route path="/explore" element={<Explore />} />

        {/* PrivateRoute: only users who are logged in can view these pages */}
        <Route element={<PrivateRoute />}>  
          <Route path='/profile' element={<Profile />} />
          <Route path='/myrecipes' element={<MyRecipes />} />
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/updatepost/:postingId' element={<UpdatePost />} />
      
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
