import React from "react";
import { useState } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
export const Chatbot = (props) => {
  const [typing,setTyping]=useState(false)
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am ChatGPT!",
            sender: "ChatGPT",
            direction:"incoming"
        },
    ]);
    const handleSend=(message)=>{
      const newMessage={
        message:message,
        direction:"outgoing"
      }
      const newMessages=[...messages,newMessage]
      setMessages((messages)=>newMessages)
      console.log(messages)
      setTyping(true)
    }
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
            <MainContainer >
                <ChatContainer>
                    <MessageList typingIndicator={typing?<TypingIndicator content="ChatGPT Typing"/>:null}>{messages.map((message,i)=>{
                      return <Message key={i} model={message}/>
                    })}</MessageList>
                    <MessageInput attachButton={false} placeholder="Type your message here" onSend={handleSend} />
                </ChatContainer>
            </MainContainer>
        </div>
    );
};
