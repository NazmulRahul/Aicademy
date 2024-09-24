import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import data from "../test";
import { userContextProvider } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import AddTopics from "../pages/AddTopics";
import plus from "../assets/plus-solid.svg";
const Sidebar = () => {
    const navigate = useNavigate();
    const {
        signedIn,
        user,
        subjects,
        topics,
        curUser,
        curTopic,
        getData,
        curData,
    } = useContext(userContextProvider);

    const [drop, setDrop] = useState([]);
    useEffect(() => {
        var arr = {};
        subjects.forEach((item) => {
            arr = { ...arr, [item.subject]: false };
        });
        setDrop(arr);
        console.log(drop);
        if (Object.keys(curTopic).length === 0) {
            handleClick(curTopic.subject);
        }
    }, [subjects, topics]);
    const handleClick = (subject) => {
        if (drop[subject]) setDrop({ ...drop, [subject]: false });
        else setDrop({ ...drop, [subject]: true });
        curData({ subject: subject }); // set curTopic's subject to selected subject
    };
    const newTopic = () => {
        navigate("/topic");
    };
    const list = subjects.map((item) => {
        return (
            <div>
                <li>
                    <button
                        onClick={() => handleClick(item.subject)}
                        className="w-full flex justify-between items-center py-2 px-4 text-lg font-sans text-gray-300 bg-[#161616] border border-gray-700 border-solid "
                        type="button"
                    >
                        {item.subject + " "}
                        <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>
                    {drop[`${item.subject}`] ? (
                        topics.map((l) => {
                            if (l.subject === item.subject) {
                                return (
                                    <button
                                        className="flex m-1 px-2 py-1 w-full cursor-pointer font-sans text-gray-300 hover:bg-gray-600  mb-2 rounded-md active:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:translate-x-2 "
                                        onClick={() => curData(l)} //set curTopic to selected topic
                                    >
                                        {l.topic}
                                    </button>
                                );
                            }
                        })
                    ) : (
                        <div></div>
                    )}
                </li>
                {drop[`${item.subject}`] ? (
                    <button
                        onClick={newTopic}
                        type="button"
                        class="flex flex-row justify-center w-[200px] transition-all text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-2xl text-sm px-2 py-1 mt-1 mb-2 ml-10 "
                    >
                        <span>
                            <img src={plus} className="size-4 px-1 " />
                        </span>
                        Add Topic
                    </button>
                ) : (
                    ""
                )}
            </div>
        );
    });

    return (
        <>
            {signedIn ? (
                <div
                    className="fixed top-[70px] h-[90vh] bg-[#0e0d0d] left-0  w-[325px] 
                overflow-scroll"
                >
                    <button
                        onClick={() => navigate("/subject")}
                        class="text-gray-300 text-2xl font-sans  w-full bg-[#252525] p-2  flex flex-row justify-center"
                    >
                        SUBJECT
                        <span>
                            <img src={plus} className="size-7" />
                        </span>
                    </button>
                    <div className="mt-4">
                        <div className="">
                            {signedIn ? (
                                <ul className="list-none w-full">{list}</ul>
                            ) : (
                                <div class="">Sign in to view subjects</div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default Sidebar;
