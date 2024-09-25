import React, { useEffect, useState } from "react";

import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import Pdf from "../assets/pdf.png";
import dlt from "../assets/delete.png";
const PDF = () => {
    const {
        signedIn,
        user,
        subjects,
        topics,
        curUser,
        getData,
        curData,
        curTopic,
        showPdf,
    } = useContext(userContextProvider);
    const [pdfs, setPdfs] = useState(curTopic.file);
    useEffect(() => {
        console.log("pdf");
        console.log(showPdf);
        console.log(curTopic);
    }, []);
    const [warn, setWarn] = useState(false);
    const [index, setIndex] = useState(0);
    const [dltFile, setDltFile] = useState("");
    const dltButton = (name) => {
        setWarn(true);
        setDltFile(name);
    };
    const confirmButton = () => {
        // console.log('confirm')
        // let prev=showPdf
        // console.log(prev)

        // prev=prev.file.filter((data,i)=>{

        //     if(data.fileName!==dltFile){
        //         return data
        //     }
        // })
        setWarn(false);
        setIndex(0);
        console.log(curTopic.file);
    };
    const cancelButton = () => {
        setWarn(false);
        setIndex(0);
    };
    return (
        <div className="">
            {warn && (
                <div className="p-4 pt-6 fixed top-[150px] left-[600px] shadow-lg border border-gray-300 w-[350px] h-[160px] flex flex-col bg-white rounded-lg items-center">
                    <div
                        className="fixed top-[155px] left-[920px]  text-gray-600 text-[18px] cursor-pointer hover:text-gray-900 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-100"
                        onClick={cancelButton}
                    >
                        x
                    </div>
                    <img src={dlt} alt="delete" class="size-7 m-2" />
                    <p className="font-semibold text-[16x] text-slate-600">
                        Are you sure yout want to delete this Pdf?
                    </p>
                    <div class="mt-2">
                        <button
                            onClick={cancelButton}
                            class="border border-gray-200 bg-slate-400 hover:bg-slate-300 rounded-md m-2 p-1 px-6 "
                        >
                            No, cancel
                        </button>
                        <button
                            onClick={confirmButton}
                            class="border border-black bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md m-2 p-1 px-6"
                        >
                            Yes, I'm sure
                        </button>
                    </div>
                </div>
            )}
            {curTopic.file && curTopic.file.length > 0 ? (
                <div className="h-[90vh] pb-10 border border-gray-200 rounded-md shadow-md overflow-scroll w-[600px]">
                    <ul>
                        {curTopic.file.map((file, index) => (
                            <li
                                key={index}
                                className="border border-gray-300 m-4 rounded-md flex flex-row justify-between bg-gray-300 pr-4"
                            >
                                <a
                                    href={file.filePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="p-2 flex flex-row">
                                        <img
                                            src={Pdf}
                                            class="size-8"
                                            alt="Image description"
                                        />
                                        <div className="p-1 text-gray-800 font-semibold">
                                            {" "}
                                            {file.fileName}
                                        </div>
                                    </div>
                                </a>
                                <button
                                    onClick={() => dltButton(file.fileName)}
                                    class=""
                                >
                                    <img
                                        src={dlt}
                                        className="size-4 hover:size-5"
                                        alt="delete"
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="h-[90vh] pb-10 border border-gray-200 rounded-md shadow-md overflow-scroll w-[600px]">
                    <h1 class="text-4xl w-full p-4 text-gray-400">No Notes Available</h1>
                </div>
            )}
        </div>
    );
};

export default PDF;
