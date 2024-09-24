import React, { useState } from "react";
import preview from "../assets/preview.png";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import Card from "./Card";
const Image = () => {
    const { setPdfText, curTopic, url, user, curData } =
        useContext(userContextProvider);
    const RenderCards = ({ data, title }) => {
        console.log("photo")
        // console.log(curTopic)
        console.log(curTopic.image)
        if (curTopic.image?.length > 0) {
            return curTopic.image.map((post,i) => <Card key={i} photo={post} />);
        } else {
            return (
                <h2 className="mt-5 text-[20px] capitalize font-bold text-blue-400">
                    {title}
                </h2>
            );
        }
    };
    return (
        <>
            <div className="grid py-4 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                <RenderCards data={curTopic.photo} title="No posts found" />
            </div>
        </>
    );
};

export default Image;
