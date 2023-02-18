import React, { useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import { motion } from 'framer-motion';


export default function Search({ searchValue,setSearchError, onSearchButton,setResults, setSearchValue}) {
  const [ search,setSearch]=useState();
  const [ searchQuery,setSearchQuery]=useState();
  // checking if we are coming back for show page
  useEffect(()=>{

    if(localStorage.getItem("isBackButton")=="true"){
      setSearch(localStorage.getItem("prevSearchValue"))
    }
  })
 // =================== ON ENTER PRESSED ========================
  const handleKeyDown = (event) => {
    event.preventDefault()
    if (event.key === 'Enter') { // to Fire the Search on Enter button pressed
     handleOnClick()
    }
  };

  const handleOnChange=(e)=>{
    e.preventDefault();
    setSearchQuery(e.target.value)
    setSearchValue(e.target.value)
    setSearchError(false)
  }
  // =========== HANDLE SEARCH BUTTON PRESS ======================
  const handleOnClick=()=>{
    if(searchQuery===""||searchQuery===undefined||searchQuery===null){ // Checking if the search query is not empty
      setSearchError(true) // triggering Error
      setResults([])
    }else{
      setSearchError(false)
      onSearchButton(searchQuery) // executing Search
    }
    

  }
  return (
    <div className=" text-gray-200  w-[100%]  mx-auto ">
        
    <div className="flex  rounded-full">
      
      <div  className="relative w-full flex items-center">
        <BsSearch size={15} className=" items-center text-[#0a3c91] font-semibold absolute ml-3" />
        <form  className='w-full flex items-center' onSubmit={e => { e.preventDefault(); }} action="">
        <input
          type="text"
          name='searchBox'
          value={searchValue}
          onChange={(e)=>{handleOnChange(e)}}
          onKeyUpCapture={(e)=>{handleKeyDown(e)}}
          placeholder="Search Anything"
          className="w-full rounded-full bg-black/90 px-3 pl-10 text-lg focus:outline-none  py-2 outline-[#0a3c91] border border-[#0a3c91] "
        />
        </form>
      </div>
    {/*  ====================== SEARCH BUTTON PRESS ========================== */}
      <motion.div
      data-testid="search-button"
      whileTap={{ scale: 0.6 }}
       onClick={()=>{handleOnClick()}} className="bg-[#0b3d91] hover:scale-100 cursor-pointer focus:outline-none focus:bg-transparent  text-lg py-2 px-6 text-white rounded-full ml-2">
        Search
      </motion.div>
    </div>

   
  </div>
  )
}
