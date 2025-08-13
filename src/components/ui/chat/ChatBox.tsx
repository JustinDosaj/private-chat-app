import React, { useEffect, useRef } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import remarkGfm from 'remark-gfm';
import { copyToClipboard } from '@/utils/copy.utils';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
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
					<div className="flex items-start gap-2">
						<div className={`
							max-w-[100%] px-4 py-2 rounded-2xl
							${msg.sender === 'user' 
							? 'bg-blue-600 text-white' 
							: 'bg-slate-50 text-slate-900'}
						`}
						>
							<MarkdownEditor.Markdown 
								remarkPlugins={[remarkGfm]}
								className="my-2 markdown-body"
								source={msg.content}
								style={{ color: 'inherit', backgroundColor: 'transparent' }}
							/>
						</div>
						{msg.sender === 'bot' && (
							<button
								onClick={() => copyToClipboard(msg.content)}
								type="button"
								aria-label="Copy message"
								className="self-start inline-flex items-center rounded-md p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
							>
								<ClipboardDocumentIcon className="h-4 w-4" />
							</button>
						)}
					</div>
				</div>
            ))}
        </div>
    )
}