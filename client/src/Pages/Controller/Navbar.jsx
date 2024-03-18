import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({setShowModal}) {
  return (
    <nav className="flex items-center justify-between py-3 px-5">
      <Link to={"/dashboard"} className="text-3xl font-black font-serif">
        GYM
      </Link>
      <ul className="flex items-center gap-5">
        <li className="text-xl ">
          <a href="#!">Home</a>
        </li>
        <li className="text-xl ">
          <a href="#!">About</a>
        </li>
        <li className="text-xl ">
          <a href="#!">Contact</a>
        </li>
      </ul>

      <button type="button" className="btn__primary" onClick={() => setShowModal(true)}>Add Member</button>
    </nav>
  );
}
