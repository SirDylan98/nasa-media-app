import React from "react";
import logo from "../Assets/img/nasareallogo.png";

export default function Logo() {
  return (
    <div className="flex items-center">
      <img src={logo} className="w-[80px] h-[80px] rounded-full object-cover " alt="" />
      <h1 className="text-xl md:text-3xl xsm:text-lg sm:text-2xl text-white uppercase font-bold">NASA <span className="text-[#ff0101] text-2xl md:text-3xl">Media</span>  Library</h1>
    </div>
  );
}
