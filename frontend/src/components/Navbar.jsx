import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./components.css";
const Navbar = () => {
    const navigate=useNavigate()
    const [search, setSearch] = useState("");
    const handleSearch = () => {
        navigate('/signin')
        console.log("click");
    };
    const handleChange = (e) => {
        e.preventDefault();
        setSearch((pre) => e.target.value);
    };
    return (
        <header className="py-[15px] px-[20px] shadow-md fixed w-full  ">
            <section className="flex flex-row justify-between">
                <Link to="/">AIcademy</Link>
                <form className="">
                    <div className="relative">
                        <div className="absolute top-[10px] flex items-center ps-3">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:cursor-pointer"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                                onClick={handleSearch}
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
                            value={search}
                            onChange={handleChange}
                            required
                            placeholder="search subjects..."
                            maxlength="100"
                            className="text-slate-600 rounded-md bg-gray-100 border border-solid py-1 px-10 focus:ring-[#4649ff] focus:border-[#4649ff] outline-none   "
                        />
                    </div>
                </form>
                <div className="">
                    <button
                        class="select-none rounded-lg bg-gradient-to-tr from-gray-800 to-gray-700 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                       Sign in
                    </button>
                </div>
            </section>
        </header>
    );
};

export default Navbar;
