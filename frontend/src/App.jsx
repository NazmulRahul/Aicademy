import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import data from "./test";
import Main from "./components/Main";
import NewSubject from "./pages/NewSubject";
import { UserContext } from "./context/UserContext";
import Profile from "./pages/Profile";
import AddTopics from "./pages/AddTopics";
import Quizz from "./pages/Quizz";
import CustomQuiz from "./pages/CustonQuiz";
import Pdf from "./pages/Pdf";
const App = () => {
    const [signedIn, setSignedIn] = useState("true");
    const list = data.map((item) => {
        return (
            <div>
                {item.subject}
                {item.topics.map((l) => {
                    return <p>{l}</p>;
                })}
            </div>
        );
    });
    return (
        <div>
            <UserContext>
                <Router>
                    <Navbar isSignedIn={signedIn} />
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
                        <Route path="/pdf" element={<Pdf />} />

                    </Routes>
                </Router>
            </UserContext>
        </div>
    );
};

export default App;
