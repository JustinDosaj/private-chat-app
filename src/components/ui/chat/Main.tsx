import { IMainView } from "@/types/settings";
import React from 'react';
import Input from "./Input";
import { ChatBox } from "./ChatBox";


export default function Main({className, messages, handleSendMessage}: IMainView) {
    
    return (
        <div className={`${className} h-screen overflow-hidden flex flex-col flex-1 bg-white`}>
            <ChatBox messages={messages}/>
            <Input handleSendMessage={handleSendMessage}/>
        </div>
    )
}