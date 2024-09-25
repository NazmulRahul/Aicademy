import React from "react";
import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import axios from "axios";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
export const Chatbot = (props) => {
    const {
        signedIn,
        user,
        subjects,
        topics,
        curUser,
        getData,
        curData,
        curTopic,
        url,
        messages,
        setMessages,
        history,
        setHistory,
    } = useContext(userContextProvider);
    const [typing, setTyping] = useState(false);
    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            direction: "outgoing",
        };
        // const newMessages = [...messages, newMessage];
        setMessages((messages) => [...messages, newMessage]);
        setHistory((prev) => [...prev, `prompt: ${message}`]);
        setTyping(() => true);
        console.log(messages);
        const data = {
            history: history,
            prompt: message,
        };
        try {
            // const response = await fetch(
            //     `http://192.168.0.109:8080/public/bot2/chat?prompt=${message}`,
            //     {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //     }
            // );
            // const data = await response.json();

            const response = await axios.post(
                `http://${url}/public/bot/chat`,
                data
            );
            const newMessage = {
                message: response.data.content,
                direction: "incoming",
            };
            setMessages((messages) => [...messages, newMessage]);
            setHistory((prev) => [
                ...prev,
                `response: ${response.data.content}`,
            ]);
            console.log(newMessage);
        } catch (error) {
            console.log(error);
        }
        setTyping(() => false);
        console.log(messages);
    };
    return (
        <div className="bg-gray-800 fixed h-[550px] w-[700px] border top-[100px] right-[30px] z-10 rounded-lg shadow-md">
            <p
                onClick={props.handle}
                class="cursor-pointer px-4 py-2  flex justify-end text-gray-300"
            >
                X
            </p>
            {/* <div class="flex">
        <div className="h-[320px] w-[270px] bg-white border m-auto rounded-lg"></div>
            
        </div>
        <textarea name="chat" class="w-[270px] ml-4 mt-1 rounded-lg p-2" id=""></textarea> */}
            <MainContainer >
                <ChatContainer>
                    <MessageList
                        typingIndicator={
                            typing ? (
                                <TypingIndicator content="Typing" />
                            ) : null
                        }
                    >
                        {messages.map((message, i) => {
                            return <Message key={i} model={message} />;
                        })}
                    </MessageList>
                    <MessageInput
                        attachButton={false}
                        placeholder="Type your message here"
                        onSend={handleSend}
                    />
                </ChatContainer>
            </MainContainer>
        </div>
    );
};
