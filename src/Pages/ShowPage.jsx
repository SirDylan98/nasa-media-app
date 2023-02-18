import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { searchById } from "../Services/apiServices";
import DOMPurify from "dompurify";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { motion } from "framer-motion";

export default function ShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState();
  // ================ GETTING THE RESULT DETAILS BY ID ========================
  useEffect(() => {
    const fetchData = async () => {
      const response = await searchById(id);
      const url = response.data.collection.items[0].href;
      await axios.get(url).then((response) => {
        
        setImages(response.data);
      });
      await setTimeout(() => {
        setLoading(false);
      }, 500);
      setDetails(response.data.collection.items[0].data[0]);
    };
    fetchData();
  }, [id]);
// ==================== BACK BUTTON FUNCTION =========================
  const handleBack = async () => {
    localStorage.setItem("isBackButton", "true");
    navigate("/");
  };
  
  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full h-screen flex items-center flex-none text-2xl text-slate-300/40">
          <h1 className="mx-auto">loading... </h1>
        </div>
      ) : (
        <div className="text-slate-100 w-full  bg-black/0  ">
          <div className="flex flex-col item-center justify-center rounded-xl mx-auto  sm:w-[90%] w-[90%] md:w-[50%]">
            <div className="mx-auto mt-24 w-full">
              <img
                src={images !== undefined ? images[1] : ""}
                alt=""
                className=" w-full h-[300px]  rounded-xl md:h-[400px] object-cover"
              />
            </div>

            <div className=" grid sm:grid-cols-2 mt-1 md:grid-cols-3">
              <h1 className=" text-blue-700 my-1 font-medium  pl-2">
                Title:{" "}
                <span className="text-slate-300  font-normal">
                  {" "}
                  {details?.title}
                </span>{" "}
              </h1>
              <h1 className=" text-blue-700 my-1 font-medium  pl-2">
                Location:{" "}
                <span className="text-slate-300  font-normal">
                  {" "}
                  {details?.location !== undefined
                    ? details?.location
                    : "Unknown"}
                </span>{" "}
              </h1>
              <h1 className=" text-blue-700 my-1 font-medium  pl-2">
                Photographer:{" "}
                <span className="text-slate-300  font-normal">
                  {" "}
                  {details?.photographer}
                </span>{" "}
              </h1>
              <h1 className=" text-blue-700 my-1 font-medium  pl-2">
                Date:{" "}
                <span className="text-slate-300 font-normal ">
                  {" "}
                  {details?.date_created}
                </span>{" "}
              </h1>
            </div>
            <div className=" mt-3">
              <h1 className=" text-slate-200 font-medium underline pl-2">
                {" "}
                Description
              </h1>
              {/*==================================PURIFYING THE DESCRIPTION ================== */}
              <p dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(details?.description, { FORCE_BODY: true })}}
               className="pl-2 content-evenly text-base"> 
              </p>
            </div>
            {/*=============== BACK BUTTON ======================= */}
            <div className="mt-2 w-full">
              <motion.button
                whileTap={{ scale: 0.8 }}
                whileHover={{scale:1.1}}
                transition={{duration:1,delay:0,repeat:5}}
                onClick={handleBack}
                className="px-auto justify-center py-2 bg-[#0b3d91] rounded-full w-full sm:w-[150px] mx-auto sm:rounded-lg sm:ml-2 font-semibold text-lg flex items-center text-slate-100"
              >
                {" "}
                <BiArrowBack size={20} className="mr-2" /> Back
              </motion.button>
            </div>
            <div className="mt-2">
              <h1 className="text-slate-200 font-medium pl-2 underline">
                Key Words
              </h1>
              <div className="w-full grid pl-2 text-left mb-10 grid-cols-2 md:grid-cols-4">
                {details?.keywords !== undefined ? (
                  details?.keywords.map((keyword, index) => (
                    <p className="text-sm" key={index}>
                      #{keyword}
                    </p>
                  ))
                ) : (
                  <p>No Keywords</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
