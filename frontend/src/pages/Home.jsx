import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContextProvider } from "../context/UserContext";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";
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
           navigate('/summary')

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
                            className="absolute top-[9px] flex items-center ps-3"
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
                    </p>
                </div>
                {/* <YouTube videoId={{videoId}} /> */}
                <ReactPlayer
                    class="rounded-lg"
                    controls
                    url="https://www.youtube.com/watch?v=z_UfPY8NXkM&ab_channel=DavidGarrettVEVO"
                />
                <ReactPlayer
                    class="rounded-lg"
                    controls
                    url="https://www.youtube.com/watch?v=z_UfPY8NXkM&ab_channel=DavidGarrettVEVO"
                />
            </div>
        </div>
    );
};

export default HomePage;
