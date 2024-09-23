import React, { useEffect } from "react";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import Pdf from "../assets/pdf.png";
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
    } = useContext(userContextProvider);
    useEffect(() => {
        console.log(curTopic.file);
    }, []);
    return (
        <div className="">
            {curTopic.file ? (
                <div className="h-[90vh] pb-10 border border-gray-200 rounded-md shadow-md overflow-scroll w-4/5">
                    {/* {curTopic.file.map((item) => {
                        <a href={item.filePath} target="_blank">
                            <img src={Pdf} alt="Image description" />
                        </a>;
                    })} */}
                    <div>This is a pdf</div>
                    <div>This is a pdf</div>

                </div>
            ) : (
                <h1 class="text-4xl w-full">No Notes Available</h1>
            )}
        </div>
    );
};

export default PDF;
