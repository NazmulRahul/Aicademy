import React from "react";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
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
        <div className="h-[90vh] pb-10 border border-gray-200 rounded-md shadow-md overflow-scroll w-4/5">
            {curTopic.content ? (
                <div
                    dangerouslySetInnerHTML={{
                        __html: `${curTopic.content}`,
                    }}
                />
            ) : (
                <h1 class="text-4xl w-full">No Content Available</h1>
            )}
        </div>
    );
};

export default Content;
