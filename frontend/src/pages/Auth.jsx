import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Auth = () => {
    const [user,setUser]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        e.preventDefault();
        setUser((user)=>({...user,[e.target.name]:e.target.value}))
        console.log(user)
    }
    const navigate = useNavigate();
    const click = () => {
        navigate("/");
    };
    const signin=()=>{
        navigate('/')
    }
    const register=()=>{
        navigate('/register')
    }

    const forgotPassword=()=>{

    }
    return (
        <section className=" backdrop-blur-[1px]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="flex justify-end">
                        <p className="px-4 hover:cursor-pointer" onClick={click}>x</p>
                    </div>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                    placeholder="example@gmail.com"
                                    value={user.email}
                                    onChange={handleChange}
                                    required="true"
                                />
                            </div>
                            <div>
                                <label
                                    for="password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                    required="true"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            for="remember"
                                            className="text-gray-500"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <p
                                    onClick={forgotPassword}
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Forgot password?
                                </p>
                            </div>
                            <button
                                onClick={signin}
                                className="w-full text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-600">
                                Don’t have an account yet?{" "}
                                <p
                                    onClick={register}
                                    className="font-medium hover:underline"
                                >
                                    Sign up
                                </p>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Auth;
