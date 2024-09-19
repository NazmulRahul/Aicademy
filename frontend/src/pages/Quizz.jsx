import React, { useContext } from "react";
import { useState, useEffect } from "react";
import quiz from "../assets/quiz.png";
// import note from "../assets/note.png";
import { useNavigate } from "react-router-dom";
import { userContextProvider } from "../context/UserContext";
const Quizz = () => {
    const navigate=useNavigate()
    const { curTopic } = useContext(userContextProvider);
    const [questions, setQuestions] = useState([]);
    const [curQues, setCurQues] = useState(2);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    // http://localhost:3000/test/quiz
    const getData = async () => {
        try {
            const response = await fetch("http://192.168.0.109:8080/public/bot2/quiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: "If you need more granular control over the request body, you can use ServletInputStream to read the raw input stream. However, this approach is generally less convenient and error-prone.",level:"university" }),
            });
            const data = await response.json();
            const clean= JSON.parse(data.content)
            console.log(clean);
            setQuestions(() => clean.questions);           
              
            setLoading(false);
            console.log(questions);
            console.log(clean.questions);
        } catch (error) {
            console.log(error);
        }
    };
    const startQuiz = () => {
        setQuizStarted(true);
        setQuizFinished(false);
        setCurQues(0);
        setScore(0);
    };
    const answer = (option) => {
        if (option[0] === questions[curQues].answer[0]) {
            setScore((prev) => prev + 1);
        }
        if (curQues < questions.length - 1) {
            setCurQues(curQues + 1);
        } else {
            setQuizFinished(true);
        }
    };
    const click=()=>{
        navigate('/')
    }
    useEffect(() => {
       
        getData();
    }, []);

    return (
        <section className=" backdrop-blur-[8px] bg-black/10 h-screen font-sans">
            <div className="flex w-[700px] flex-col items-center justify-center px-6 py-8 mx-auto ">
                <div className=" w-full h-[400px] bg-white rounded-lg border shadow mt-[100px] ">
                    <div className="flex justify-end">
                        <p
                            className="px-4  text-gray-600 text-[20px] cursor-pointer hover:text-gray-900 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-100"
                            onClick={click}
                        >
                            x
                        </p>
                    </div>
                    <div className="h-full items-center">
                        {loading ? (
                            <p>Loading Questions...</p>
                        ) : !quizStarted || quizFinished ? (
                            <div class="flex flex-col justify-center items-center">
                                <button class="p-2 border bg-pink-500 font-sans font-bold text-white" onClick={startQuiz}>
                                    {quizFinished
                                        ? "Restart Quiz"
                                        : "Start Quiz"}
                                </button>
                                {quizFinished && (
                                    <div class="m-4">
                                        <p>Quiz Finished</p>
                                        <p>Your Score: {score}</p>
                                        <p>Correct answer: {score}</p>
                                        <p>Wrong answer: {questions.length-score}</p>
                                        <button></button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-10">
                                <h2 class="text-gray-800 font-bold text-lg">{curQues+1}. {questions[curQues].question}</h2>
                                <div>
                                    {questions[curQues].options.map(
                                        (option) => {
                                            return (
                                                <button
                                                    class="cursor-pointer flex border border-gray-500 my-4 p-2 rounded-lg w-full justify-start hover:bg-gray-300"
                                                    onClick={() =>
                                                        answer(option)
                                                    }
                                                >
                                                    {option}
                                                </button>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quizz;
