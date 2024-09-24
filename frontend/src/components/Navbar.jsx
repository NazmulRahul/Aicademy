import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import Logo from "../assets/Mamun.png";
import LogoSvg from "../assets/AICademy.svg";
const Navbar = (props) => {
    const {
        signedIn,
        user,
        subjects,
        topics,
        curUser,
        getData,
        curData,
        handleLogout,
        url,
    } = useContext(userContextProvider);
    
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const handleSearch = () => {};
    const handleChange = (e) => {
        e.preventDefault();
        setSearch((pre) => e.target.value);
    };
    const handleSignin = () => {
        navigate("/signin");
    };
    const handleRegister = () => {
        navigate("/register");
    };
    const navProfile = () => {
        navigate("/profile");
    };
    const addSubject = () => {
        navigate("/subject");
    };
    const quiz = () => {
        navigate("/customquiz");
    };
    const logout=()=>{
        handleLogout()
        navigate('/')
    }
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token != null) {
    //         getData(token);
    //         curUser({email:localStorage.getItem("email")});
    //         navigate('/main')
            
    //     }
    // }, []);
    return (
        <header className="py-[15px] px-[20px] backdrop-blur-[7px] fixed w-full bg-black text-gray-200 bg-transparent ">
            <section className="flex flex-row justify-between">
                <Link to="/main">
                    <img src={Logo} class="h-10"/>
                
                </Link>               
                <form className="">
                    <div className="relative">
                        <div className="absolute top-[9px] flex items-center ps-3">
                            <svg
                                className="w-4 h-5 text-gray-500 dark:text-gray-400 hover:cursor-pointer"
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
                            className="rounded-md border border-gray-700 bg-black h-10 w-[390px] p-2 border-solid py-1 px-10 focus:ring-[#414047] focus:border-[#505057] outline-none   "
                        />
                    </div>
                </form>
                <div className="flex text-xl">
                    <p onClick={quiz} class="cursor-pointer">
                        Quiz
                    </p>
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        aria-label="Use Light Mode"
                        class="hover:translate-x-1 mr-6 flex items-center justify-center w-9 h-9 transition-transform rounded-full active:scale-95 hover:bg-primary/5 hover:dark:bg-primary-dark/5 outline-link"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                        >
                            <g
                                fill="none"
                                fill-rule="evenodd"
                                transform="translate(-442 -200)"
                            >
                                <g
                                    fill="currentColor"
                                    transform="translate(356 144)"
                                >
                                    <path
                                        fill-rule="nonzero"
                                        d="M108.5 24C108.5 27.5902136 105.590214 30.5 102 30.5 98.4097864 30.5 95.5 27.5902136 95.5 24 95.5 20.4097864 98.4097864 17.5 102 17.5 105.590214 17.5 108.5 20.4097864 108.5 24zM107 24C107 21.2382136 104.761786 19 102 19 99.2382136 19 97 21.2382136 97 24 97 26.7617864 99.2382136 29 102 29 104.761786 29 107 26.7617864 107 24zM101 12.75L101 14.75C101 15.1642136 101.335786 15.5 101.75 15.5 102.164214 15.5 102.5 15.1642136 102.5 14.75L102.5 12.75C102.5 12.3357864 102.164214 12 101.75 12 101.335786 12 101 12.3357864 101 12.75zM95.7255165 14.6323616L96.7485165 16.4038616C96.9556573 16.7625614 97.4143618 16.8854243 97.7730616 16.6782835 98.1317614 16.4711427 98.2546243 16.0124382 98.0474835 15.6537384L97.0244835 13.8822384C96.8173427 13.5235386 96.3586382 13.4006757 95.9999384 13.6078165 95.6412386 13.8149573 95.5183757 14.2736618 95.7255165 14.6323616zM91.8822384 19.0244835L93.6537384 20.0474835C94.0124382 20.2546243 94.4711427 20.1317614 94.6782835 19.7730616 94.8854243 19.4143618 94.7625614 18.9556573 94.4038616 18.7485165L92.6323616 17.7255165C92.2736618 17.5183757 91.8149573 17.6412386 91.6078165 17.9999384 91.4006757 18.3586382 91.5235386 18.8173427 91.8822384 19.0244835zM90.75 25L92.75 25C93.1642136 25 93.5 24.6642136 93.5 24.25 93.5 23.8357864 93.1642136 23.5 92.75 23.5L90.75 23.5C90.3357864 23.5 90 23.8357864 90 24.25 90 24.6642136 90.3357864 25 90.75 25zM92.6323616 30.2744835L94.4038616 29.2514835C94.7625614 29.0443427 94.8854243 28.5856382 94.6782835 28.2269384 94.4711427 27.8682386 94.0124382 27.7453757 93.6537384 27.9525165L91.8822384 28.9755165C91.5235386 29.1826573 91.4006757 29.6413618 91.6078165 30.0000616 91.8149573 30.3587614 92.2736618 30.4816243 92.6323616 30.2744835zM97.0244835 34.1177616L98.0474835 32.3462616C98.2546243 31.9875618 98.1317614 31.5288573 97.7730616 31.3217165 97.4143618 31.1145757 96.9556573 31.2374386 96.7485165 31.5961384L95.7255165 33.3676384C95.5183757 33.7263382 95.6412386 34.1850427 95.9999384 34.3921835 96.3586382 34.5993243 96.8173427 34.4764614 97.0244835 34.1177616zM103 35.25L103 33.25C103 32.8357864 102.664214 32.5 102.25 32.5 101.835786 32.5 101.5 32.8357864 101.5 33.25L101.5 35.25C101.5 35.6642136 101.835786 36 102.25 36 102.664214 36 103 35.6642136 103 35.25zM108.274483 33.3676384L107.251483 31.5961384C107.044343 31.2374386 106.585638 31.1145757 106.226938 31.3217165 105.868239 31.5288573 105.745376 31.9875618 105.952517 32.3462616L106.975517 34.1177616C107.182657 34.4764614 107.641362 34.5993243 108.000062 34.3921835 108.358761 34.1850427 108.481624 33.7263382 108.274483 33.3676384zM112.117762 28.9755165L110.346262 27.9525165C109.987562 27.7453757 109.528857 27.8682386 109.321717 28.2269384 109.114576 28.5856382 109.237439 29.0443427 109.596138 29.2514835L111.367638 30.2744835C111.726338 30.4816243 112.185043 30.3587614 112.392183 30.0000616 112.599324 29.6413618 112.476461 29.1826573 112.117762 28.9755165zM113.25 23L111.25 23C110.835786 23 110.5 23.3357864 110.5 23.75 110.5 24.1642136 110.835786 24.5 111.25 24.5L113.25 24.5C113.664214 24.5 114 24.1642136 114 23.75 114 23.3357864 113.664214 23 113.25 23zM111.367638 17.7255165L109.596138 18.7485165C109.237439 18.9556573 109.114576 19.4143618 109.321717 19.7730616 109.528857 20.1317614 109.987562 20.2546243 110.346262 20.0474835L112.117762 19.0244835C112.476461 18.8173427 112.599324 18.3586382 112.392183 17.9999384 112.185043 17.6412386 111.726338 17.5183757 111.367638 17.7255165zM106.975517 13.8822384L105.952517 15.6537384C105.745376 16.0124382 105.868239 16.4711427 106.226938 16.6782835 106.585638 16.8854243 107.044343 16.7625614 107.251483 16.4038616L108.274483 14.6323616C108.481624 14.2736618 108.358761 13.8149573 108.000062 13.6078165 107.641362 13.4006757 107.182657 13.5235386 106.975517 13.8822384z"
                                        transform="translate(0 48)"
                                        stroke="currentColor"
                                        stroke-width="0.25"
                                    ></path>
                                    <path
                                        d="M98.6123,60.1372 C98.6123,59.3552 98.8753,58.6427 99.3368,58.0942 C99.5293,57.8657 99.3933,57.5092 99.0943,57.5017 C99.0793,57.5012 99.0633,57.5007 99.0483,57.5007 C97.1578,57.4747 95.5418,59.0312 95.5008,60.9217 C95.4578,62.8907 97.0408,64.5002 98.9998,64.5002 C99.7793,64.5002 100.4983,64.2452 101.0798,63.8142 C101.3183,63.6372 101.2358,63.2627 100.9478,63.1897 C99.5923,62.8457 98.6123,61.6072 98.6123,60.1372"
                                        transform="translate(3 11)"
                                    ></path>
                                </g>
                                <polygon points="444 228 468 228 468 204 444 204"></polygon>
                            </g>
                        </svg>
                    </button>
                    {signedIn ? (
                        <div class="flex">
                            <div class="p-2 cursor-pointer" onClick={navProfile}>
                                profile
                            </div>
                            <button
                                class="select-none   rounded-lg bg-gradient-to-tr from-gray-800 to-gray-700 py-1 px-2 text-center align-middle font-sans text-[12px] font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
                                type="button"
                                onClick={logout}
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                class="select-none   rounded-lg bg-gradient-to-tr from-gray-800 to-gray-700 py-1 px-2 text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
                                type="button"
                                onClick={handleSignin}
                            >
                                Sign in
                            </button>
                            <button
                                class="select-none ml-2  rounded-lg bg-transparent py-1 px-2 text-center align-middle font-sans text-md border border-gray-500 font-bold uppercase text-gray-900 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
                                type="button"
                                onClick={handleRegister}
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </header>
    );
};

export default Navbar;
