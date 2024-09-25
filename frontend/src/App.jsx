import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import data from "./test";
import Main from "./components/Main";
import NewSubject from "./pages/NewSubject";
import Profile from "./pages/Profile";
import AddTopics from "./pages/AddTopics";
import Quizz from "./pages/Quizz";
import CustomQuiz from "./pages/CustonQuiz";
import { UserContext } from "./context/UserContext";
import PdfSave from "./pages/PdfSave";
import Home from "./pages/Home";
import CreatImage from "./pages/CreatImage";
import Summary from "./pages/Summary";
const App = () => {
   
    return (
        <div className="bg-black w-full h-screen">
            <UserContext>
                <Router>
                    <Navbar />
                    <Routes>
                        {/* <Route path="/" element={<Home />} /> */}
                        <Route path="/" element={<Home />} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/createImage" element={<CreatImage />} />
                        <Route path="/subject" element={<NewSubject />} />
                        <Route path="/signin" element={<Auth />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/topic" element={<AddTopics />} />
                        <Route path="/quiz" element={<Quizz />} />
                        <Route path="/customquiz" element={<CustomQuiz />} />
                        <Route path="/pdfsave" element={<PdfSave />} />
                        <Route path="/summary" element={<Summary />} />
                    </Routes>
                </Router>
            </UserContext>
        </div>
    );
};

export default App;
