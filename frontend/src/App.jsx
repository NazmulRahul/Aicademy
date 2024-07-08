import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import { NavbarDefault } from "./components/Test";
const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/signin" element={<Auth />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
