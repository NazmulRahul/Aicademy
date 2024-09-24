import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContextProvider } from "../context/UserContext";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import youtube from "../assets/youtube.png";
const Summary = () => {
    const navigate = useNavigate();
    const [summary, setSummary] = useState("");
    const [generating, setGenerating] = useState(false);
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
    useEffect(()=>{
        if(localStorage.getItem("token")==null){
            navigate('/signin')
        }
    },[])
    const click = () => {
        var p =
            /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (!videoLink.match(p)) {
            alert("Please Enter a Valid Link!");
        }
    };
    const generateSummary = async () => {
        var p =
            /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (!videoLink.match(p)) {
            alert("Please Enter a Valid Link!");
        }else{
            const data = {
                url: videoLink,
            };
            try {
                setGenerating(true);
                const response = await axios.post(
                    `http://${url}/public/youtube/summarize`,
                    data
                );
                if (response.status == 200) {
                    console.log(response.data);
                    setSummary(() => response.data.content);
                    console.log(summary);
                } else {
                    throw error;
                }
            } catch (error) {
                console.log(error);
                alert("network error, try again!");
            } finally {
                setGenerating(false);
            }
        }
        
    };
    return (
        <div class=" w-full h-[100vh] bg-black font-sans text-gray-200 overflow-scroll">
            <div class="flex flex-col justify-center items-center  mt-[70px] mb-10">
                <div class="mt-10 flex flex-col font-semibold items-center ">
                <h1 class="text-[32px] font-semibold text-gray-200 mb-5">
                    Learn With AiCademy
                </h1>                    
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
                            className="rounded-md border border-gray-700 bg-black h-10 w-[590px] p-2 border-solid py-1 px-10 focus:ring-[#414047] focus:border-[#505057] outline-none   "
                            onChange={handleChange}
                            value={videoLink}
                        />
                    </div>
                </div>
                <div class="mt-6">
                    {summary.length > 0 ? (
                        <ReactPlayer
                            muted={true}
                            class="rounded-lg"
                            controls
                            url={videoLink}
                        />
                    ) : (
                        <a
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                            target="_blank"
                        >
                            <img
                                src={youtube}
                                className="opacity-70"
                                alt="youtube"
                            />
                        </a>
                    )}
                </div>
                <button
                    class="border border-solid border-gray-700 rounded-lg px-4 py-2 w-[500px] h-14 mt-4 flex justify-center bg-gray-950 hover:bg-gray-900 "
                    onClick={generateSummary}
                >
                    <div class="flex items-center space-x-4 text-base">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-sparkle"
                        >
                            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                        </svg>
                        <span>
                            {generating ? "Generating" : "Generate Summary"}
                        </span>
                    </div>
                </button>
                {summary.length > 0 && (
                    <div className="h-[50vh] pb-10 border bg-gray-950 border-gray-800 rounded-md shadow-md overflow-scroll w-[700px] font-sans mt-5 mb-10 ">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: `${summary}`,
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Summary;
