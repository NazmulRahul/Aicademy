import React, { useEffect, useState } from "react";
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
        level:"School",
        instruction: "",
    });
    const handleChange = (e) => {
        e.preventDefault();
        setTopic({ ...newTopic, [e.target.name]: e.target.value });
        console.log(newTopic);
    };
    const navigate = useNavigate();
    const createTopic = () => {
        addTopics(newTopic);
        navigate("/main");
    };
    const click = () => {        
        navigate("/main");
    };
    useEffect(()=>{
        if (localStorage.getItem("token") == null) {
            navigate('/signin')
        }
    },[])
    return (
        <div class="fixed top-0 left-0 backdrop-blur-[7px] bg-blue-800/20 h-screen w-full  font-sans z-10">
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
                            <div>
                            <label className="mb-2 font-semibold text-gray-900">
                                Level
                            </label>
                            <select name="level" onChange={handleChange} class="flex w-32 p-1 mt-2 font-medium text-gray-700 bg-white border border-gray-200 rounded-md cursor-pointer">
                                <option value="School">School</option>
                                <option value="College">College</option>
                                <option value="University">University</option>
                            </select>
                        </div>
                            <button
                                onClick={createTopic}
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
