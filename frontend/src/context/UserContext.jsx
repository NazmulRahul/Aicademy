import React, { createContext, useState } from "react";
export const userContextProvider = createContext(null);
import axios from "axios";
export const UserContext = (props) => {
    const[url,setUrl]=useState("192.168.0.104:8080")
    const [quizData,setQuizData]=useState({
        text:"",
        totalQuestions:"5",
        level:"Easy"
    })
    const [pdfText,setPdfText]=useState([])
    const [signedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState({});
    const [subjects, setSubject] = useState([]);
    const [topics, setTopics] = useState([]);
    const [curTopic, setCurTopic] = useState({});
    const[showPdf,setShowPdf]=useState([])
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
                `http://${url}/public/topic`,
                data
            );
            if (response.status === 200) {
                const subjectsData = [];
                const topicsData=[]
                console.log(response.data.subToTopicsMap);
                for (let key in response.data.subToTopicsMap) {
                    subjectsData.push({subject:key});
                    response.data.subToTopicsMap[key].forEach((topic)=>{
                        const data={subject:key,content:topic.content,topic:topic.topicName,image:topic.imagePath,file:topic.filePath}
                        topicsData.push(data)
                    })
                }
                setSubject(()=>subjectsData)
                setTopics(()=>topicsData)
                setShowPdf(topicsData)
                console.log("topics")  
                console.log(topics)              
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
                `http://${url}/public/topic/newSubject`,
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
                `http://${url}/public/topic/new`,
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
        quizData,
        pdfText,
        setPdfText,
        url,
        showPdf,
        setShowPdf
    };
    return (
        <userContextProvider.Provider value={contextValue}>
            {props.children}
        </userContextProvider.Provider>
    );
};
