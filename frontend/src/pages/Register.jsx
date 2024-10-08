import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
const Register = () => {
    const { setPdfText, curTopic, url, curData } =
    useContext(userContextProvider);
    const navigate = useNavigate();
    const [tempUser, setTempUser] = useState({
        name: "",
        email: "",
        password: "",
        rePassword:""
    });
    const [reg,setReg]=useState(true)
    const [otp,setOtp]=useState("")
    const handleChange = (e) => {
        e.preventDefault();
        setTempUser((user) => ({ ...user, [e.target.name]: e.target.value }));
        console.log(tempUser);
    };

    const signup = async() => {
        console.log(tempUser)
        if(tempUser.password!==tempUser.rePassword){
            alert('Passwords do not match')
        }
        else{
            try {
                const data={
                    name:tempUser.name,
                    email:tempUser.email,
                    password:tempUser.password
                }
                const response = await axios.post(
                    `http://${url}/api/auth/register`,
                    data
                );
                if (response.status === 200) {
                    setReg(false)
                }
            } catch (error) {
                console.log(error);
            }
        }
       
    };
    const login = () => {
        navigate("/signin");
    };
    const handleOtp=(e)=>{
        setOtp(e.target.value)
    }
    const verifyOtp=async()=>{
        const data={
            otp:otp
        }
        try {
            const response = await axios.post(
                `http://${url}/api/auth/verify`,data
                
            );
            console.log(response)
            if (response.status === 200) {
                alert('Verified Successfully!')
                navigate('/signin')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className="fixed top-0 left-0 backdrop-blur-[7px] bg-blue-800/20 h-screen w-full  font-sans z-10">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div
                        className="flex justify-end"
                        onClick={() => navigate("/")}
                    >
                        <p className="px-4 hover:cursor-pointer">x</p>
                    </div>
                    
                    {
                        reg?(
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h1>
                        <div className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    for="name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="full name"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    for="email"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="example@gmail.com"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    for="rePassword"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    for="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="confirm-password"
                                    name="rePassword"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                onClick={signup}
                                className="w-full text-white font-semibold bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account?{" "}
                                <p
                                    onClick={login}
                                    className="font-medium hover:underline "
                                >
                                    Login here
                                </p>
                            </p>
                        </div>
                    </div>
                        ):(
                            <div className="p-4 m-2">
                                <label
                                    for="otp"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Confirm Email
                                </label>
                                <input
                                    
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="check mail for otp"
                                    required={true}
                                    onChange={handleOtp}
                                />
                                <button onClick={verifyOtp} className="mt-2 w-1/2 text-white font-semibold bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center ">
                                    Confirm
                                </button>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </section>
    );
};

export default Register;
