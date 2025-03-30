import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar"; 
import Homepage from "./pages/Home";
import BottomTextInput from "./components/BottomTextInput";
import "./App.css"; 

function App() {
  const [inputValue, setInputValue] = useState("");
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <SideBar />
          <div className="flex-1 ml-16">
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
          </div>
        </div>
        <BottomTextInput 
          value={inputValue}
          onChange={handleInputChange}
          placeholder="What's Quackening..."
        />
      </div>
    </Router>
  );
}

export default App;