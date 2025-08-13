'use client';

import React, { useEffect, useState } from 'react';
import Settings from '@/components/ui/chat/Settings';
import Menu from '@/components/ui/chat/Menu';
import SidePanel from '@/components/ui/chat/SidePanel';
import Main from '@/components/ui/chat/Main';
import { useConversations } from '@/hooks/useConversations';
import { useParams } from 'next/navigation';
import { Bars3Icon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useChat } from '@/hooks/useChat';

const ChatPage = () => {
    
    const { conversationId } = useParams() as { conversationId: string };
    const { messages, handleSendMessage, privacySettings, handleTogglePrivacy, handleToggleAllPrivacy } = useChat(conversationId)
    const { fetchConversations } = useConversations();
    const [showMenu, setShowMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
      fetchConversations();
    }, [fetchConversations]);

    return (
        <div className="h-screen flex flex-col md:flex-row bg-white font-sans overflow-hidden">
        
            {/* Mobile Header */}
            <div className="flex md:hidden justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
                <button onClick={() => setShowMenu(true)} aria-label="Open menu">
                    <Bars3Icon className="h-6 w-6 text-slate-700" />
                </button>
                <button onClick={() => setShowSettings(true)} aria-label="Open settings">
                    <AdjustmentsHorizontalIcon className="h-6 w-6 text-slate-700" />
                </button>
            </div>

            {/* Sidebar Menu */}
            <SidePanel isOpen={showMenu} onClose={() => setShowMenu(false)} side="left" widthClass="md:w-[15vw] w-64">
                <Menu 
                    className="h-full"
                    conversationId={conversationId}
                />
            </SidePanel>

            {/* Main Chat Area */}
            <Main messages={messages} handleSendMessage={handleSendMessage}/>
        

            {/* Settings */}
            <SidePanel isOpen={showSettings} onClose={() => setShowSettings(false)} side="right" widthClass="w-80 md:w-[30vw]">
                <Settings 
                    className="h-full"
                    privacySettings={privacySettings}
                    handleTogglePrivacy={handleTogglePrivacy}
                    handleToggleAllPrivacy={handleToggleAllPrivacy}
                />
            </SidePanel>
        </div>
    );
};

export default ChatPage;
