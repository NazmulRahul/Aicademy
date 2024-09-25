import { useState, useEffect } from "react";
import quiz from "../assets/quiz.png";
// import note from "../assets/note.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import axios from "axios";
import Loader from "../components/Loader";
const Quizz = () => {
    const { quizData, setQuizData, curTopic, url, signedIn } =
        useContext(userContextProvider);
    const [answers, setAnswers] = useState(false);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [curQues, setCurQues] = useState(2);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    // `http://${url}/public/bot/quiz`
    const getData = async () => {
        console.log(quizData);
        try {
            const response = await axios.post(
                `http://${url}/public/bot/quiz`,
                quizData
            );
            console.log(response.data);
            const clean = JSON.parse(response.data.content);
            console.log(clean);
            console.log(clean.questions);
            setQuestions(clean.questions);
            console.log(questions);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAnswers = () => {
        setAnswers(true);
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
    const click = () => {
        if (signedIn) {
            navigate("/main");
        } else {
            navigate("/home");
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <section className="fixed top-0 left-0 backdrop-blur-[7px] bg-blue-800/20   w-full  font-sans z-10">
            <div className="flex w-[700px] flex-col items-center justify-center px-6 py-8 mx-auto ">
                <div className=" w-full  h-[90vh] overflow-scroll bg-white rounded-lg border shadow mt-[20px] ">
                    <div className="flex justify-end">
                        <p
                            className="px-4  text-gray-600 text-[20px] cursor-pointer hover:text-gray-900 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-100"
                            onClick={click}
                        >
                            x
                        </p>
                    </div>
                    {!answers && (
                        <div className="h-full items-center">
                            {loading ? (
                                <div className="relative justify-center">
                                    <p class="items-center font-semibold flex justify-center">
                                        Loading Questions...
                                    </p>
                                    <div class="absolute top-12 left-[320px]">
                                        <Loader />
                                    </div>
                                </div>
                            ) : !quizStarted || quizFinished ? (
                                <div class="flex flex-col justify-center items-center">
                                    <button
                                        class="p-2 border bg-pink-500 font-sans font-bold rounded-xl text-white"
                                        onClick={startQuiz}
                                    >
                                        {quizFinished ? (
                                            "Restart Quiz"
                                        ) : (
                                            <p className="">Start Quiz</p>
                                        )}
                                    </button>
                                    {quizFinished && (
                                        <div class="mt-16">
                                            <p className="font-semibold text-3xl text-gray-800">
                                                Quiz Finished
                                            </p>
                                            <p>Your Score: {score}</p>
                                            <p>Correct answer: {score}</p>
                                            <p>
                                                Wrong answer:{" "}
                                                {questions.length - score}
                                            </p>
                                            <button
                                                class="border border-solid p-2 m-6 px-10 bg-green-300 rounded-xl font-semibold text-gray-800"
                                                onClick={handleAnswers}
                                            >
                                                See Answers
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-10">
                                    <h2 class="text-gray-800 font-bold text-lg">
                                        {curQues + 1}.{" "}
                                        {questions[curQues].question}
                                    </h2>
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
                    )}
                    {answers && (
                        <div>
                            {questions.map((q) => {
                                return (
                                    <div className="p-10">
                                        <h2 class="text-gray-800 font-bold text-lg">
                                            {q.id + 1}. {q.question}
                                        </h2>
                                        <li className="list-none">
                                            {q.options.map((option) => {
                                                if (option[0] === q.answer[0]) {
                                                    return (
                                                        <ul class="list-none cursor-pointer flex border bg-green-100 border-gray-500 my-4 p-2 rounded-lg w-full justify-start ">
                                                            {option}
                                                        </ul>
                                                    );
                                                } else {
                                                    return (
                                                        <ul class="list-none cursor-pointer flex border border-gray-500 my-4 p-2 rounded-lg w-full justify-start">
                                                            {option}
                                                        </ul>
                                                    );
                                                }
                                            })}
                                        </li>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Quizz;
