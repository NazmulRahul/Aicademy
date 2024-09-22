import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import data from "./test";
import Main from "./components/Main";
import NewSubject from "./pages/NewSubject";
import { userContextProvider } from "./context/UserContext";
import Profile from "./pages/Profile";
import AddTopics from "./pages/AddTopics";
import Quizz from "./pages/Quizz";
import CustomQuiz from "./pages/CustonQuiz";
import { UserContext } from "./context/UserContext";
import PdfView from "./pages/PdfView";
const App = () => {
    return (
        <div>
            <UserContext>
                <Router>
                    <Navbar/>
                    <Sidebar />
                    <Main/>
                    <Routes>
                        <Route path="/subject" element={<NewSubject />} />
                        <Route path="/signin" element={<Auth />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/topic" element={<AddTopics />} />
                        <Route path="/quiz" element={<Quizz />} />
                        <Route path="/customquiz" element={<CustomQuiz />} />
                        
                    </Routes>
                </Router>
            </UserContext>
            
        </div>
    );
};

export default App;
