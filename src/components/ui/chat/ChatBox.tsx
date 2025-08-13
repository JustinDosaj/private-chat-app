import React, { useEffect, useRef } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import remarkGfm from 'remark-gfm';
import { IMessage } from '@/types/chat';

export const ChatBox = ({messages}: {messages: IMessage[]}) => {

    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return(
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`
                        max-w-[100%] px-4 py-2 rounded-2xl
                        ${msg.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-slate-900'}
                    `}
                    >
                    {msg.sender === 'bot' ? (
                        <MarkdownEditor.Markdown 
                            remarkPlugins={[remarkGfm]}
                            className="my-4"
                            source={msg.content}
                        />
                    ) : (
                        msg.content // Render plain text for user messages
                    )}
                    </div>
                </div>
            ))}
        </div>
    )
}