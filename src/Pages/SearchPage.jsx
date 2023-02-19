import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BsEmojiFrown } from "react-icons/bs";
import Search from "../Components/Search";
import Logo from "../Components/Logo";
import ResultsCard from "../Components/ResultsCard";
import { searchQuery, searchQueryWithDates,searchQuerySuggestions } from "../Services/apiServices";
import YearPicker from "../Components/YearPicker";
import { motion } from "framer-motion";

export default function SearchPage() {
  const [yearRange, setYearRange] = useState({ startYear: "", endYear: "" });
  const [searchValue, setSearchValue] = useState(""); //
  const [searched, setSearched] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchError, setSearchError] = useState(false);

//  FETCHING PESISTED STATE FROM LOCAL STORAGE
  useEffect(() => {
    const isBackButton = localStorage.getItem("isBackButton");
    if (isBackButton === "true") {
      const data = localStorage.getItem("prevSearchResults");
      setSearchValue(localStorage.getItem("prevSearchValue"));
      setResults(JSON.parse(data));
    }
    localStorage.setItem("isBackButton", "false");
  }, [searchError]);
  // console.log("these are my final suggestions", suggestions);
//===============SHORTERNING THE SUGGESTIONS==================
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  //====================ON SUGGESTION CLICK =====================
  const handleSuggestionClick= (text)=>{
    setSearchValue(text)
    setSuggestions([])
    onSearchButton()
    
  }
  /// get the data so that it can help with suggestions 
  const handleSearch2=async(query)=>{
    return  await searchQuerySuggestions(query);  
  }

//============================== BUTTON TO SEARCH ====================================
  const onSearchButton = () => {
    setSearched(searchValue);
    setSuggestions([])
    const fetchData = async () => {
      try {
        //checking if the year Range was specified or Not
        if ( yearRange.startYear !== "" &&searchError === false && yearRange !== undefined) {
          setLoading(true);
          //calling The Get End Point
          const response = await searchQueryWithDates(
            searchValue,
            yearRange.startYear,
            yearRange.endYear
          );
          await setTimeout(() => {
            setLoading(false);
          }, 500);
          const finalResponse = response.data.collection.items
            .filter((re) => {
              return re.data[0].photographer !== undefined||re.data[0].location !== undefined; // Filtering the results that  have either a photographer or location
            })
            .slice(0, 9);

          setResults(finalResponse);
          /// persists to local storage
          localStorage.setItem("prevSearchResults",JSON.stringify(finalResponse));
          localStorage.setItem("prevSearchValue", searchValue);
   
        } else {
          if (searchError === false) {
            setLoading(true);
            const response = await searchQuery(searchValue);

            await setTimeout(() => {
              setLoading(false);
            }, 500);
            const finalResponse = response.data.collection.items
              .filter((re) => {
                return re.data[0].photographer !== undefined||re.data[0].location !== undefined;
              })
              .slice(0, 9);
            setResults(finalResponse);
            /// persists to local storage
            localStorage.setItem("prevSearchResults",JSON.stringify(finalResponse));
            localStorage.setItem("prevSearchValue", searchValue);
           
          }
        }
      } catch (e) {}
    };
    fetchData();
  };

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
      className="w-full flex flex-col h-full justify-center    mx-auto"
    >
     {/*========================================== HERO LOGO COMPONENT ========================================= */}
      <div className=" div-hero-logo-component">
        <div className=" flex justify-center items-center">
          <Logo />
        </div>
      </div>
      {/* ======================================= SEARCH BOX COMPONENT ======================================== */}
      <div className=" div-search-box-component">
        
        <Search
          onSearchButton={onSearchButton}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          setSearchError={setSearchError}
          setResults={setResults}
          handleSearch2={handleSearch2}
          setSuggestions={setSuggestions}
          setYearRange={setYearRange}
        />
      </div>
      {/* ======================================= Suggestions ========================================= */}
     {suggestions.length>0&&searchValue.length>0?suggestions.map(suggestion=>(
      <div onClick={()=>{handleSuggestionClick(suggestion.data[0].description)}} className="  div-search-box-suggestions hover:bg-black/50  text-white   text-sm md:text-md"  key={suggestion?.data[0].nasa_id}
      > <h1 className="border-b border-b-slate-300/0 pb-1 flex my-1 items-center"><BsSearch  className="mx-1"/> {truncateString(suggestion.data[0].title,35)} </h1>
        </div>
     )):null}


{/* ===========================================SEARCH VALIDATION ERROR ====================================== */}
      <div className=" flex flex-col w-[100%] justify-center  mx-auto sm:w-[80%] md:w-[60%] lg:w-[40%]">
        <div>
          {searchError && (
            <p className="text-red-600 ml-5 text-sm">
              Please enter a search Criteria
            </p>
          )}
        </div>
        {/*================================= YEAR PICKER============================================== */}
        <YearPicker yearRange={yearRange} setYearRange={setYearRange} />
      </div>
      {/* ==================================== RESULTS LABEL=================================================== */}
      <div className=" w-full md:w-[80%] flex justify-center mt-7 mx-auto pl-4">
        {loading ? (
          <p className="text-slate-300/40">loading....</p>
        ) : (
          <h1 className="text-xl justify-center text-center text-slate-200 ">
            {results.length === 0 &&
            searchValue !== "" &&
            searched === searchValue &&
            searchValue !== undefined ? (
              <p className="flex items-center mr-4">
                Ooops No Match Found{" "}
                <BsEmojiFrown className="text-white/25 ml-1" />
              </p>
            ) : (
              !searchError && (
                <p className="ease-in-out duration-500 text-lg ">
                  Results{`(${results.length})`}
                </p>
              )
            )}
          </h1>
        )}
      </div>
      {/* ======================================== RENDER SEARCH RESULTS ==================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        className="div-render-results-component"
      >
        {results.length > 0 && loading === false && searchError == false
          ? results.map((result, index) => (
              <ResultsCard key={index} result={result} />
            ))
          : null}
      </motion.div>
    </motion.div>
  );
}
