import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResultsCard({ result }) {
  const navigate = useNavigate();
  //cutting off the long collection titles
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const handleOnPreview = (id) => {
    navigate(`/show/${id}`);
  };
  return (
    <div className="div-resultscard-component   ">
      <img
        className="w-full h-full object-cover rounded-xl block"
        src={result.links[0].href}
        alt=""
      />

      <div>
        <div className="absolute top-0 left-0 w-full h-[90%] rounded-t-xl hover:bg-black/70 opacity-0 bg-black/40 hover:opacity-100 text-white">
          <div className=" flex mt-[20%] flex-col">
            <p className="white-space-normal break-all text-md md:text-lg  flex justify-center mt-2 h-full text-left">
              Location:{" "}
              {result.data[0].location === undefined
                ? "Unknown"
                : result.data[0].location}
            </p>
            <p className="white-space-normal text-md break-all text-xs md:text-lg  flex justify-center mt-2 h-full text-left">
              Photographer:{" "}
              {result.data[0].photographer === undefined
                ? "Unknown"
                : result.data[0].photographer}
            </p>
            <motion.button
              whileTap={{ scale: 0.8 }}
              whileHover={{ x: 10 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              onClick={() => {
                handleOnPreview(result.data[0].nasa_id);
              }}
              className="py-2 px-8 rounded-2xl mt-4 bg-[#0b3d91]/80 mx-auto"
            >
              Show
            </motion.button>
          </div>
        </div>
        <div className="absolute bottom-0 bg-black/80 text-slate-200 rounded-b-xl left-0 w-full h-[10%]">
          <h1 className="ml-1">
            Title: {truncateString(result.data[0].title, 50)}
          </h1>
        </div>
      </div>
    </div>
  );
}
