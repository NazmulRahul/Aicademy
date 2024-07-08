import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
const App = () => {
    const [signedIn, setSignedIn] = useState("true");
    return (
        <>
            <Router>
                <Navbar isSignedIn={signedIn} />
                <Routes>
                    <Route path="/signin" element={<Auth />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
