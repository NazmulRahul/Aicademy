import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/signin" element={<Auth />} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
