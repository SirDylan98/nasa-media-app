import React from "react";

import logo from "../Assets/img/nasalogoo3.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.div
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0, type: "spring", stiffness: 50 }}
      className="flex w-full bg-[#060e1c] shadow-xl shadow-black/40 md:shadow-black/20 fixed rounded-b-lg  text-slate-100 z-[100]  "
    >
      <div className="flex justify-between md:w-[90%] uppercase  font-semibold  items-center  mx-auto py-2">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={logo}
              className="w-[80px] h-[60px]  object-contain "
              alt=""
            />
          </Link>
          
        </div>
        <div className="flex md:pl-24 items-center">
          <h1 className=" md:text-lg  mx-3 ">Careers</h1>
          <h1 className=" md:text-lg mx-3 ">About</h1>
          <h1 className=" md:text-lg mx-3 ">Contact</h1>
        </div>

        <h1 className="text-lg hidden md:flex mx-3 ">Developers</h1>
      </div>
    </motion.div>
  );
}
