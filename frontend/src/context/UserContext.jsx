import React, { createContext, useState } from "react";
export const userContextProvider = createContext(null);
import axios from "axios";
export const UserContext = (props) => {
    const [quizData,setQuizData]=useState({
        text:"",
        totalQuestions:"5",
        level:"Easy"
    })
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
        const data = { email: email };
        try {
            const response = await axios.post(
                "http://192.168.0.106:8080/public/topic",
                data
            );
            console.log(response.data);
            if (response.status === 200) {
                const subjectsData = [];
                const topicsData=[]
                // response.data.subToTopicsMap.forEach((item)=>{
                //     test.push([item]);
                // })
                // console.log(test)
                console.log(response.data.subToTopicsMap);
                for (let key in response.data.subToTopicsMap) {
                    console.log(key)
                    subjectsData.push({subject:key});
                    response.data.subToTopicsMap[key].forEach((topic)=>{
                        const data={subject:key,content:topic.content,topic:topic.topicName,image:topic.imagePath,file:topic.filePath}
                        console.log(data)
                        topicsData.push(data)
                    })
                }
                setSubject(()=>subjectsData)
                setTopics(()=>topicsData)                
            }
        } catch (error) {
            console.log(error);
        }
        // try {
        //     const response = await fetch("http://localhost:3000/test/topics", {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     });
        //     const data = await response.json();
        //     setTopics(data);
        // } catch (error) {
        //     console.log(error);
        // }

        //setTopics
    };
    const curData = (topic) => {
        setCurTopic(()=>topic);
    };
    const addSubject = async (data) => {
        try{
            const response = await axios.post(
                "http://192.168.0.106:8080/public/topic/newSubject",
                data
            );
            if(response.status==200){
                curData({subject:response.data.subject})
                getData(user.email);                
                console.log(response.data)
            }else{
                alert('Something Went Wrong')
            }
        }catch(error){
            console.log(error)
            alert("network error")
        }
    };
    const addTopics = async (data) => {
        try{
            const response = await axios.post(
                "http://192.168.0.106:8080/public/topic/new",
                data
            );
            if(response.status==200){
                curData({subject:response.data.subject})
                getData(user.email);                
                console.log(response.data)
            }else{
                alert('Something Went Wrong')
            }
        }catch(error){
            console.log(error)
            alert("network error")
        }
        
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
        addTopics,
        setQuizData,
        quizData
    };
    return (
        <userContextProvider.Provider value={contextValue}>
            {props.children}
        </userContextProvider.Provider>
    );
};
