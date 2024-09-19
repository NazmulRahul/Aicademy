import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        discipline: "",
        subject: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        e.preventDefault();
        setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
        console.log(user);
    };

    const signup = () => {};
    const login = () => {
        navigate("/signin");
    };
    const register = async () => {
        try {
            const response = await fetch("http://localhost:3000/test/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tempUser),
            });
            if (response.status === 200) {
                const data = await response.json();
                curUser(data);
                getData(tempUser.email);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className="backdrop-blur-[2px]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div
                        className="flex justify-end"
                        onClick={() => navigate("/")}
                    >
                        <p className="px-4 hover:cursor-pointer">x</p>
                    </div>

                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
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
                                    required="true"
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
                                    required="true"
                                    onChange={handleChange}
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                                    required="true"
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
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required="true"
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
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
