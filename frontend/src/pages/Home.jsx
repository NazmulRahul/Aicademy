import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const {
        signedIn,
        user,
        subjects,
        topics,
        curUser,
        getData,
        curData,
        curTopic,
    } = useContext(userContextProvider);
    const navigate = useNavigate();

    return (
        <>
            {signedIn ? (
                <div>
                   
                </div>
            ) : (
                navigate("/signin")
            )}
        </>
    );
};

export default Home;
