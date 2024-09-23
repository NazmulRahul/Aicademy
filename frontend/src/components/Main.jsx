import React, { useEffect, useState } from "react";
import quiz from "../assets/quiz.png";
import note from "../assets/note.png";
import chatbot from "../assets/chatbot2.png";
import home from "../assets/home.png";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import { Chatbot } from "./Chatbot";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";
import Content from "./Content";
import Image from "./Image";
import PDF from "./PDF";

const Main = () => {
    const navigate = useNavigate();
    const [showNotes, setShowNotes] = useState(false);
    const {
        signedIn,
        user,
        subjects,
        topics,
        curUser,
        getData,
        curData,
        curTopic,
        url
    } = useContext(userContextProvider);
    const [chat, setChat] = useState(false);
    const handle = () => {
        setChat((chat) => !chat);
    };
    const handleQuiz = () => {
        console.log("CurTopic " + curTopic);
        navigate("/quiz");
    };
    const click = () => {
        setShowNotes((prev) => !prev);
    };
    const [activeTab, setActiveTab] = useState("Content");

    const handleTabClick = (tabName) => {
        console.log(activeTab);
        setActiveTab(() => tabName);
    };
    return (
        <>
            {signedIn ? (
                <div>
                    <div className="fixed top-[70px] left-[350px] ml-8 ">
                        <div className="flex justify-items-start">
                            <button class="bg-slate-200 rounded-md p-2 font-semibold text-gray-800 m-2 w-20 hover:bg-slate-400 active:bg-slate-400 focus:outline-none focus:bg-slate-300 focus:translate-x-2 " onClick={() => handleTabClick("Content")}>
                                Text
                            </button>
                            <button class="bg-slate-200 rounded-md p-2 font-semibold text-gray-800 m-2 w-20 hover:bg-slate-400 active:bg-slate-400 focus:outline-none focus:bg-slate-300 focus:translate-x-2 " onClick={() => handleTabClick("Image")}>
                                Images
                            </button>
                            <button class="bg-slate-200 rounded-md p-2 font-semibold text-gray-800 m-2 w-20 hover:bg-slate-400 active:bg-slate-400 focus:outline-none focus:bg-slate-300 focus:translate-x-2 " onClick={() => handleTabClick("PDF")}>
                                Notes
                            </button>
                        </div>
                        <div class="mt-[10px]">
                            {activeTab === "Content" && <Content />}

                            {activeTab === "Image" && <Image />}

                            {activeTab === "PDF" && <PDF />}
                        </div>
                       
                        <div className="fixed right-16 top-[200px]">
                            <img
                                className="w-16 h-16 m-14 cursor-pointer  hover:w-20 hover:h-20"
                                src={quiz}
                                onClick={handleQuiz}
                            />
                            <img
                                className="w-16 h-16 m-14 cursor-pointer  hover:w-20 hover:h-20"
                                src={note}
                                onClick={click}
                            />
                            <img
                                onClick={handle}
                                className="w-16 h-16 m-14 cursor-pointer  hover:w-20 hover:h-20"
                                src={chatbot}
                            />
                            {chat && <Chatbot handle={handle} />}
                        </div>
                    </div>
                    {showNotes && <Notes click={click} />}
                </div>
            ) : (
                <img src={home} />
                // <div>hello</div>
            )}
        </>
    );
};

export default Main;
