import React, { useEffect } from "react";
import { useState } from "react";
import data from "../test";

const Sidebar = () => {
    const [drop, setDrop] = useState([]);
    useEffect(() => {
        var arr={}
        data.forEach((item)=>{
            arr={...arr,[item.subject]:false}
        })
        setDrop(arr);
    }, []);
    const handleClick = (subject) => {
        if (drop[subject])
             setDrop({...drop,[subject]:false});
        else 
            setDrop({...drop,[subject]:true});
    };
    const list = data.map((item) => {
        return (
            <div>
                <li>
                    <button
                        onClick={()=>handleClick(item.subject)}                        
                        className="w-full flex justify-between items-center py-1 px-2 text-lg font-sans text-slate-800 bg-slate-200 hover:bg-slate-400 hover:translate-x-2 hover:text-white mb-4 rounded-md active:bg-slate-500 focus:outline-none  focus:bg-slate-400 focus:text-white "
                        type="button"
                    >
                        {item.subject + " "}
                        <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>
                    {drop[`${item.subject}`] ? (
                        item.topics.map((l) => {
                            return (
                                <button className="flex m-1 px-2 py-1 w-full cursor-pointer font-sans text-slate-800 hover:bg-slate-300  mb-2 rounded-md active:bg-slate-400 focus:outline-none focus:bg-slate-300 focus:translate-x-2 ">
                                    {l}
                                </button>
                            );
                        })                        
                    ) : (
                        <div></div>
                    )}
                </li>
                {
                    drop[`${item.subject}`]?(
                        <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 mt-1 mb-2 ml-10 ">Add new topic</button>
                    ):""
                }
                
            </div>
        );
    });

    return (
        <div
            className="px-2 bg-gray-50 fixed top-[68px] left-0 border h-[90vh] w-[350px] border-rose-50
                overflow-scroll"
        >   <h1 className="px-[110px] mt-2 text-2xl font-bold font-sans text-slate-700 tracking-tight">Subjects</h1>
            <div className="px-6 py-4">
                <ul className="list-none">{list}</ul>
            </div>
        </div>
    );
};

export default Sidebar;
