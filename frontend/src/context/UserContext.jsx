import React, { createContext, useState } from "react";
export const userContextProvider = createContext(null);

export const UserContext = (props) => {
    const [signedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState({});
    const [subjects, setSubject] = useState([]);
    const [topics, setTopics] = useState([]);
    const [curTopic, setCurTopic] = useState({});

    const curUser = (data) => {
        setUser(data);
        setSignedIn(true);
    };
    const handleLogout = () => {
        setUser({});
        setSignedIn(false);
    };
    const getData = async (email) => {
        try {
            const response = await fetch(
                "http://localhost:3000/test/subjects",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            setSubject(data);
        } catch (error) {
            console.log(error);
        }
        try {
            const response = await fetch("http://localhost:3000/test/topics", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setTopics(data);
        } catch (error) {
            console.log(error);
        }

        //setTopics
    };
    const curData = (topic) => {
        setCurTopic(topic);
    };
    const addSubject = async (data) => {
        const response = await fetch("http://localhost:3000/test/addSubject", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        getData(user.email);
    };
    const addTopics = async (data) => {
        const response = await fetch("http://localhost:3000/test/addTopic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const topic=await response.json()
        getData(user.email)
        
        curData(topic)
    };
    const contextValue = {
        signedIn,
        user,
        subjects,
        topics,
        curUser,
        getData,
        curData,
        handleLogout,
        curTopic,
        addSubject,
        addTopics
    };
    return (
        <userContextProvider.Provider value={contextValue}>
            {props.children}
        </userContextProvider.Provider>
    );
};
