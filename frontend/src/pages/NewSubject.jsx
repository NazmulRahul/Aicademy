import React, { useState } from "react";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import data from "../test";
const NewSubject = () => {
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
    } = useContext(userContextProvider);
    const [newSubject, setNewSubject] = useState({
        email:user.email,
        subject: "",
        
    });
    const handleChange = (e) => {
        e.preventDefault();
        setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
        console.log(newSubject);
    };
    const navigate = useNavigate();
    const click = () => {
        addSubject(newSubject)
        navigate("/");
    };
    return (
        <div class="fixed top-0 left-0 backdrop-blur-[7px] bg-blue-800/20 h-screen w-full  font-sans z-10">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-2 flex justify-end">
                        <p
                            className="px-4 hover:cursor-pointer text-gray-600 text-[20px] hover:text-gray-900 hover:bg-gray-100 rounded-full"
                            onClick={click}
                        >
                            x
                        </p>
                    </div>
                    <div class="p-4">
                        <h2 class="py-4 text-xl font-bold leading-tight tracking-tight text-gray-900">
                            Add Subject:
                        </h2>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <input
                                    type="txt"
                                    name="subject"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                    placeholder="Subject Name"
                                    value={newSubject.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <label class="mr-4  text-gray-800">
                                Select level:
                            </label>
                            <select
                                name="level"
                                onChange={handleChange}
                                class=" bg-slate-700 text-white p-2 rounded-md text-md font-sans font-semibold cursor-pointer hover:bg-slate-800"
                            >
                                <option name="Level" value="School">
                                    School
                                </option>
                                <option name="Level" value="Highschool">
                                    Highschool
                                </option>
                                <option name="Level" value="College">
                                    College
                                </option>
                                <option name="Level" value="University">
                                    University
                                </option>
                            </select>
                            <button onClick={click} className="flex p-2 border rounded-lg font-bold text-gray-700 shadow-md bg-gray-50 hover:bg-gray-200">
                                Done
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewSubject;
