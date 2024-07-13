import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import data from "./test";
import Main from "./components/Main";

const App = () => {
    
    const [signedIn, setSignedIn] = useState("true");
    const list=data.map((item)=>{
        return <div>{item.subject}
          {
           item.topics.map((l)=>{
               return <p>{l}</p>
           })
          }
        
        </div>
      })
    return (
        <>            

            <Router>               
                <Navbar isSignedIn={signedIn} />  
                <Sidebar/>            
                <Main/>
                <Routes>
                    <Route path="/signin" element={<Auth />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
