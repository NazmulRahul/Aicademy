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
import Sidebar from "./Sidebar";
import notes from "../assets/Notes.png";
import text from "../assets/Text.png";
import image from "../assets/Image.png";
import quizIcon from "../assets/test.png";
import Profile from "./Profile";
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
        url,
        profile,
    } = useContext(userContextProvider);
    const [chat, setChat] = useState(false);
    const handle = () => {
        setChat((chat) => !chat);
    };
    const handleQuiz = () => {
        if (curTopic.topic) {
            navigate("/customquiz");
        } else {
            alert("Please first select a topic...");
        }
    };
    const click = () => {
        if (curTopic.topic) {
            setShowNotes((prev) => !prev);
        } else {
            alert("Please first select a topic...");
        }
    };
    const [activeTab, setActiveTab] = useState("Content");

    const handleTabClick = (tabName) => {
        console.log(activeTab);
        setActiveTab(() => tabName);
    };
    return (
        <>
            {signedIn && (
                <div class="h-screen w-full bg-black">
                    <Sidebar />
                    <div className=" fixed top-[70px] left-[326px] bg-[#17191d] w-full ">
                        <div className="px-4 text-lg mt-1  flex justify-start ">
                            <button
                                class="flex flex-row mx-5"
                                onClick={() => handleTabClick("Content")}
                            >
                                <img
                                    src={text}
                                    className="size-4 mt-[6px] mr-2"
                                />
                                <p class="text-gray-300  font-semibold">Text</p>
                            </button>
                            <button
                                class="flex flex-row mx-5"
                                onClick={() => handleTabClick("Image")}
                            >
                                <img
                                    src={image}
                                    className="size-4 mt-[6px] mr-2"
                                />
                                <p class="text-gray-300  font-semibold">
                                    Images
                                </p>
                            </button>
                            <button
                                class="flex flex-row mx-5"
                                onClick={() => handleTabClick("PDF")}
                            >
                                <img
                                    src={notes}
                                    className="size-4 mt-[6px] mr-2"
                                />
                                <p class="text-gray-300  font-semibold">
                                    Notes
                                </p>
                            </button>
                        </div>
                        <div class="mt-[10px]">
                            {activeTab === "Content" && <Content />}

                            {activeTab === "Image" && <Image />}

                            {activeTab === "PDF" && <PDF />}
                        </div>
                        <div></div>
                        <div className="fixed right-16 top-[200px]">
                            <img
                                className="w-16 h-16 m-14 cursor-pointer  hover:w-20 hover:h-20"
                                src={quizIcon}
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
                    {profile && <Profile />}
                </div>
            )}
        </>
    );
};

export default Main;
