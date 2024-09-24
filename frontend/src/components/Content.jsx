import React from "react";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import book from '../assets/Book.png'
const Content = () => {
    const {
        signedIn,
        user,
        subjects,
        topics,
        curUser,
        getData,
        curData,
        curTopic,
        url
    } = useContext(userContextProvider);
    return (
        <div className="h-[80vh] pb-5 mb-10 ml-1  border-gray-200  rounded-md shadow-md overflow-scroll w-3/5">
            {curTopic.content ? (
                <div
                    dangerouslySetInnerHTML={{
                        __html: `${curTopic.content}`,
                    }}
                />
            ) : (
                <img src={book} class="pl-32"/>
            )}
        </div>
    );
};

export default Content;
