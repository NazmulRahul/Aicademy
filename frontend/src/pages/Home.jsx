import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContextProvider } from "../context/UserContext";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import Homepage from "../assets/HomeFinal.png";
import { Button } from "@chatscope/chat-ui-kit-react";
const HomePage = () => {
    const navigate = useNavigate();
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
        setVideoLink,
        videoLink,
    } = useContext(userContextProvider);

    const handleChange = (e) => {
        e.preventDefault();
        setVideoLink(e.target.value);
        console.log(videoLink);
    };
    const click = () => {
        navigate("/summary");
    };
    return (
        <div class=" w-full h-[100vh] bg-black font-sans text-gray-200 overflow-scroll">
            <div class="flex flex-col justify-center items-center mt-[70px] ">
                <h1 class="text-[32px] font-semibold text-gray-200 mt-10">
                    Learn With AiCademy
                </h1>
                <div class=" mt-10 flex flex-col font-semibold items-center ">
                    <div className="relative">
                        <div
                            className="absolute top-[9px] flex items-center ps-3 z-0"
                            onClick={click}
                        >
                            <svg
                                className="w-4 h-5 text-gray-500 dark:text-gray-400 hover:cursor-pointer"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            name="search_box"
                            placeholder="Copy and Paste a Video Link To Get Summary..."
                            maxlength="100"
                            className="rounded-md border border-gray-700 bg-black h-10 w-[590px] p-2 border-solid py-1 px-10 focus:ring-[#414047] focus:border-[#505057] outline-none   "
                            onChange={handleChange}
                            value={videoLink}
                        />
                    </div>

                    <p class="m-2">or</p>
                    <p class="text-[17px]">
                        Take an AI Generated{" "}
                        <span class="text-blue-300 font-bold text-[20px] hover:text-[23px] cursor-pointer">
                            Quiz
                        </span>
                        {' '}and many more...
                    </p>
                </div>
                {/* <YouTube videoId={{videoId}} /> */}
                <button  onClick={()=>navigate('/signin')}              
                    class="z-10 hover:bg-gray-900 text-[40px] pt-4 pb-4 px-6 font-semibold  mt-10 border-2  rounded-[40px] border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_2px_#08f,0_0_8px_#15f,0_0_30px_#08f]"
                >
                    GetStarted
                </button>
                <img src={Homepage} class="mt-4" alt="HomePage" />
            </div>
        </div>
    );
};

export default HomePage;
