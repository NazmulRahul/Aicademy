import React, { useState } from "react";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const AddTopics = (props) => {
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
        addTopics,
    } = useContext(userContextProvider);

    const [newTopic, setTopic] = useState({
        email: user.email,
        subject: curTopic.subject,
        topic: "",
        instruction: "",
        image: 0,
        notes: "",
    });
    const handleChange = (e) => {
        e.preventDefault();
        setTopic({ ...newTopic, [e.target.name]: e.target.value });
        console.log(newTopic);
    };
    const navigate = useNavigate();
    const click = () => {
        addTopics(newTopic);
        navigate("/");
    };
    return (
        <div class="backdrop-blur-[2px]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-2 flex justify-end">
                        <p
                            className="px-4  text-gray-600 text-[20px] cursor-pointer hover:text-gray-900 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-100"
                            onClick={click}
                        >
                            x
                        </p>
                    </div>
                    <div class="py-2 px-4">
                        <h2 class="py-4 text-xl font-bold leading-tight tracking-tight text-gray-900">
                            Add Topic:
                        </h2>

                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label className="p">Topic Name:</label>
                                <input
                                    type="txt"
                                    name="topic"
                                    id="topic"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                    placeholder="Topic Name"
                                    value={newTopic.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <label htmlFor="" className="">
                                Instruction:
                            </label>
                            <textarea
                                name="instruction"
                                value={newTopic.instruction}
                                onChange={handleChange}
                                placeholder="Add examples, references, atleast 500 words etc"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                            />
                            <label class="mr-4  text-gray-800">
                                Generate Images:
                            </label>
                            <select
                                name="image"
                                onChange={handleChange}
                                class=" bg-slate-700 text-white p-1 rounded-md text-sm font-sans font-semibold cursor-pointer hover:bg-slate-800"
                            >
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <button
                                onClick={click}
                                className="flex p-2 border rounded-lg font-bold text-gray-700 shadow-md bg-gray-50 hover:bg-gray-200"
                            >
                                Done
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTopics;
