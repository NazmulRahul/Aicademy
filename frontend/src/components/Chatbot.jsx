import React from "react";
import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
export const Chatbot = (props) => {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am ChatGPT!",
            sender: "ChatGPT",
            direction: "incoming",
        },
        ]);
    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            direction: "outgoing",
        };
        // const newMessages = [...messages, newMessage];
        setMessages((messages) => [...messages,newMessage]);
        setTyping(()=>true);
        console.log(messages)
        try {
            const response = await fetch(
                `http://192.168.0.109:8080/public/bot2/chat?prompt=${message}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            const newMessage = {
                message: data.content,
                direction: "incoming",
            };
            setMessages((messages) => [...messages,newMessage]);
            console.log(newMessage)
        } catch (error) {
            console.log(error);
        }
        setTyping(()=>false) 
        console.log(messages)       
    };
    return (
        <div className="bg-gray-300 fixed h-[550px] w-[700px] border top-[100px] right-[30px] z-10 rounded-lg shadow-md">
            <p
                onClick={props.handle}
                class="cursor-pointer px-4 py-2  flex justify-end"
            >
                X
            </p>
            {/* <div class="flex">
        <div className="h-[320px] w-[270px] bg-white border m-auto rounded-lg"></div>
            
        </div>
        <textarea name="chat" class="w-[270px] ml-4 mt-1 rounded-lg p-2" id=""></textarea> */}
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        typingIndicator={
                            typing ? (
                                <TypingIndicator content="ChatGPT Typing" />
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
