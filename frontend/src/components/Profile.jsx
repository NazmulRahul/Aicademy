import React from "react";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import dlt from "../assets/delete.png";
import axios from 'axios'
const Profile = (props) => {
    const {
        signedIn,
        user,
        subjects,
        topics,
        curUser,
        getData,
        curData,
        profile,
        setProfile,
        url
    } = useContext(userContextProvider);
    const dltButton =async (subject) => {
        const data = {
            email: user.email,
            subject: subject,
        };
        console.log(data)
        try{
            const response = await axios.post(
                `http://${url}/public/subject/delete`,
                data
            );
        }catch(error){
            console.log(error)
            alert('Network error')
        }finally{
            getData(localStorage.getItem('token'))
        }
    };
    const handleProfile=()=>{
        setProfile(false)
    }
    return (
        <>
            {profile && (
                <section className=" fixed w-full backdrop-blur-[6px] bg-black/15 h-[100vh] font-sans z-20">
                    <div className="flex w-[400px] flex-col items-center justify-center px-6 py-8 mx-auto ">
                        <div className="w-full bg-gray-200 rounded-lg border h-[60vh] shadow-md mt-[50px] overflow-scroll">
                            <div className="flex justify-end">
                                <p
                                    className="px-4  text-gray-600 text-[20px] cursor-pointer hover:text-gray-900 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-100"
                                    onClick={handleProfile}
                                >
                                    x
                                </p>
                            </div>
                            <div class="flex flex-col justify-center ">
                                <p className="mx-2">Email:</p>
                                <p className="p-2">{user.email}</p>
                                <ul class="">
                                    {subjects.map((sub, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className="border border-gray-300 m-4 rounded-md flex flex-row justify-between bg-gray-300 pr-4"
                                            >
                                                <div className="p-2 flex flex-row">
                                                    <div className="p-1 text-gray-800 font-semibold">
                                                        {" "}
                                                        {sub.subject}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        dltButton(sub.subject)
                                                    }
                                                    class=""
                                                >
                                                    <img
                                                        src={dlt}
                                                        className="size-4 hover:size-5"
                                                        alt="delete"
                                                    />
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Profile;
