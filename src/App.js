import { Route, Routes } from "react-router-dom";
import "./App.css";
import SearchPage from "./Pages/SearchPage";
import ShowPage from "./Pages/ShowPage";
import Navbar from "./Components/Navbar";
function App() {
  return (
    <div  className="">
      <Navbar/>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/show/:id" element={<ShowPage />} />
      </Routes>
       
    </div>
  );
}

export default App;
