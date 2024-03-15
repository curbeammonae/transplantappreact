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


export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* PrivateRoute: only users who are logged in can view these pages */}
        <Route element={<PrivateRoute />}>  
          <Route path='/profile' element={<Profile />} />
          <Route path='/createpost' element={<CreatePost />} />
      
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
