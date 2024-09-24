import React, { useState } from "react";
import preview from "../assets/preview.png";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
const CreatImage = () => {
    const navigate = useNavigate();
    const click = () => {
        navigate("/");
    };
    const [prompt, setPrompt] = useState("");
    const [generating, setGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);
    const [link, setLink] = useState("");
    const { setPdfText, curTopic, url, user, curData } =
        useContext(userContextProvider);
    const handleInput = (e) => {
        e.preventDefault();
        setPrompt(e.target.value);
    };
    const GenerateImage = async () => {
        setGenerating(true);
        const data = {
            email: user.email,
            subject: curTopic.subject,
            topic: curTopic.topic,
            prompt: prompt,
        };
        try {
            const response = await axios.post(
                `http://${url}/public/bot/image/generate`,
                data
            );
            if (response.status == 200) {
                setGenerated(true);
                setLink(response.data.link);
                console.log(response.data);
            } else {
                alert("Network error");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setGenerating(false);
        }
    };
    return (
        <section className=" fixed w-full backdrop-blur-[6px] bg-black/15 h-[100vh] font-sans z-1020">
            <div className="flex w-[800px] flex-col items-center justify-center px-6 py-8 mx-auto ">
                <div className="w-full bg-white rounded-lg border h-[90vh] shadow-md mt-[20px] overflow-scroll">
                    <div className="flex justify-end">
                        <p
                            onClick={click}
                            className="px-4  text-gray-600 text-[20px] cursor-pointer hover:text-gray-900 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-100"
                        >
                            x
                        </p>
                    </div>
                    <div class="flex flex-col justify-center p-4">
                        <h1 className="text-[32px] font-extrabold font text-[#222328] ">
                            Create
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Create imaginative and visually stunning images with{" "}
                            <span className="text-slate-800">DALL-E</span>
                        </p>
                    </div>
                    <div className="mt-5 max-w-3xl">
                        <label className="m-3">
                            What kind of Image do you need about{" "}
                            <span class="font-semibold ">{curTopic.topic}</span>
                        </label>
                        <textarea
                            class="w-2/3 border border-gray-300 m-3 rounded-md h-15 p-2 "
                            placeholder="Describe what you need..."
                            value={prompt}
                            onChange={handleInput}
                        />
                        {generated ? (
                            <img src={link} alt="preview" className="size-56" />
                        ) : (
                            <img
                                src={preview}
                                alt="preview"
                                className="opacity-40 size-56"
                            />
                        )}
                        {generating && (
                            <div className="fixed top-[366px]  left-[610px] size-40 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                <Loader />
                            </div>
                        )}
                        {generated ? (
                            <button   class="bg-blue-500 border border-gray-300 p-2 rounded-md font-semibold text-white m-3" onClick={navigate('/')}>Upload</button>
                        ) : (
                            <button
                                class="bg-blue-500 border border-gray-300 p-2 rounded-md font-semibold text-white m-3"
                                onClick={GenerateImage}
                            >
                                {" "}
                                {generating ? "Generating..." : "Generate"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreatImage;
