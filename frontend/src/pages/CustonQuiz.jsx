import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bulb from "../assets/lightbulb-2-48.png";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
const CustomQuiz = () => {
    const {
        signedIn,
        user,
        subjects,
        topics,
        curUser,
        getData,
        curData,
        handleLogout,
        curTopic,
        addSubject,
        quizData,
        setQuizData,
        url,
    } = useContext(userContextProvider);
    const [inputText, setText] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const navigate = useNavigate();
    const click = () => {
        if (signedIn) {
            navigate("/main");
        } else {
            navigate("/");
        }
    };
    const handlePdf = async (event) => {
        setPdfFile((val) => event.target.files[0]);

        const formData = new FormData();
        formData.append("pdfFile", event.target.files[0]);
        console.log(pdfFile);
        // http://localhost:3000/test/api/text/upload
        try {
            console.log(formData);
            //   const response = await axios.post('http://192.168.0.109:8080/public/extractor', formData, {
            //     headers: {
            //       'Content-Type': 'multipart/form-data'
            //     }
            //   });
            //   console.log(response)
            //   setText(response.data.text)
            // setPdfData(response.data.pdfData);
            // setNumPages(response.data.numPages);
            const response = await axios.post(
                `http://${url}/public/extractor`,
                formData
            );
            console.log(response.data);
            //   console.log(data)
            setQuizData((data) => ({ ...data, text: response.data.content }));
        } catch (error) {
            console.error("Error uploading PDF:", error);
        }
    };

    const handleInput = (e) => {
        e.preventDefault();
        setQuizData((data) => ({ ...data, [e.target.name]: e.target.value }));
        console.log(quizData);
    };
    const makeQuiz = () => {
        navigate("/quiz");
    };
    return (
        <section className="fixed top-0 left-0 backdrop-blur-[7px] bg-blue-800/20 h-screen w-full  font-sans z-10">
            <div className="flex w-[800px] flex-col items-center justify-center px-6 py-8 mx-auto ">
                <div className="w-full bg-white rounded-lg border shadow mt-[30px] ">
                    <div className="flex justify-end">
                        <p
                            className="px-4  text-gray-600 text-[20px] cursor-pointer hover:text-gray-900 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-100"
                            onClick={click}
                        >
                            x
                        </p>
                    </div>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl flex justify-center">
                        Make Quizzes with{" "}
                        <span class="text-blue-700 px-2 font-bold">AI</span>
                    </h1>
                    <div class="mt-5 p-4 ">
                        <label className="block mb-2 text-[18px] font-semibold font-sans text-gray-700">
                            Text to use
                        </label>
                        <textarea
                            name="text"
                            placeholder="Copy and paste the text you'd like to generate a quiz for."
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 h-[150px]"
                            value={quizData.text}
                            onChange={handleInput}
                        />

                        <div class="">
                            <p class="py-2 px-2 text-gray-700 font-semibold ">
                                or, upload and extract text from a pdf file
                            </p>
                            <input
                                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
                                id="file_input"
                                type="file"
                                accept=".pdf"
                                onChange={handlePdf}
                            />
                        </div>
                    </div>
                    <div class="p-4 flex flex-row justify-evenly">
                        <div>
                            <label className="mb-2 font-semibold text-gray-900">
                                Total Questions
                            </label>
                            <select
                                name="totalQuestions"
                                onChange={handleInput}
                                class="flex w-28 p-1 mt-2 font-medium text-gray-700 bg-white border border-gray-200 rounded-md cursor-pointer"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 font-semibold text-gray-900">
                                Difficulty
                            </label>
                            <select
                                name="level"
                                onChange={handleInput}
                                class="flex w-32 p-1 mt-2 font-medium text-gray-700 bg-white border border-gray-200 rounded-md cursor-pointer"
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Difficult">Difficult</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <button
                            onClick={makeQuiz}
                            class="border flex flex-row border-gray-200 p-2 bg-pink-500 rounded-md mb-4 font-bold font-sans text-white hover:bg-pink-600"
                        >
                            <img src={bulb} class="h-6 w-6 " alt="quiz" />
                            <p class="px-2 ">Generate Quiz</p>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomQuiz;
