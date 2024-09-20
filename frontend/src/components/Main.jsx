import React, { useEffect, useState } from "react";
import quiz from "../assets/quiz.png";
import note from "../assets/note.png";
import chatbot from "../assets/chatbot2.png";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import { Chatbot } from "./Chatbot";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";
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
    return (
        <div>
           
            <div className="fixed top-[70px] left-[350px] ml-8 ">
                <div className="h-[90vh] pb-10 overflow-scroll w-4/5">
                    {signedIn ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: `${curTopic.content}`,
                            }}
                        />
                    ) : (
                        <h1 class="text-4xl w-full">Please Sign in</h1>
                    )}
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
            {showNotes && <Notes click={click}/>}
        </div>
    );
};

export default Main;
