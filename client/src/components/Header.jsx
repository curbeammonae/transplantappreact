import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-slate-600">
    
      <Link to="/">
        <li className="hidden sm:inline text-slate-700 hover:underline">
          Home
        </li>
      </Link>
      <Link to="/about">
        <li className="hidden sm:inline text-slate-700 hover:underline">
          About
        </li>
      </Link>
      <Link to="/signin">
        <li className=" text-slate-700 hover:underline">Sign In</li>
      </Link>
      <Link to="/signup">
        <li className=" text-slate-700 hover:underline">Sign Up</li>
      </Link>
    </div>
  );
}
