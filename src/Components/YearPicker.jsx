import React from 'react'
import { YearRangePicker } from "react-year-range-picker";
export default function YearPicker({yearRange,setYearRange}) {
  return (
    <div className="flex pr-1 mx-auto justify-center">
    <div className=" flex flex-col mt-5 mx-auto">
      <YearRangePicker
        minYear={new Date().getFullYear() - 60}
        maxYear={new Date().getFullYear()}
        onSelect={(startYear, endYear) => {
          setYearRange({ startYear, endYear });
        }}
        startYear={yearRange?.startYear}
        endYear={yearRange?.endYear}
        style={{ maxWidth: "200px", width: "100%" }}
        classNames="custom-year-range-picker"
        selectedColor="#0b3d91"
      />
      {yearRange&&(<span  className="text-slate-400 text-center">
        Selected Years : {yearRange?.startYear} - {yearRange?.endYear}
      </span>)}
      
    </div>
  </div>
  )
}
