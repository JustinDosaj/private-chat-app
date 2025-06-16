import { useState, useCallback, useEffect } from "react";
import { PII_TYPE_OPTIONS } from "@/config/options.config";
import { getMessages, sendMessage } from "@/services/api.service";
import { useAuth } from "./useAuth";
import { IMessage, IResponse } from "@/types/chat";
import { useRouter } from "next/navigation";
//import { useConversations } from "./useConversations";

export const useChat = (conversationId: string | null | undefined) => {

    if (conversationId == 'new') {
        conversationId = null
    }
    
    const { user } = useAuth();
    //const { fetchConversations } = useConversations();
    const router = useRouter();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // If there's a conversationId, load its messages
    useEffect(() => {
        if (!conversationId || !user ) return;
            const loadMessages = async () => {
            const response = await getMessages({user, conversationId})
            setMessages(response || []);
        };

        loadMessages();
    }, [user, conversationId]);

    const handleSendMessage = async (input: string) => {
        
        if (!input.trim()) return;
        setIsLoading(true);
    
        // Optimistic update
        setMessages(prev => [...prev, { sender: 'user', content: input }]);
    
        try {
            let response: IResponse;
        
            // New chat
            if (!conversationId) {
                response = await sendMessage({input, privacySettings, user, conversationId})
                //await fetchConversations();
                router.replace(`/chat/${response.conversationId}`); // Move to new chat route
            } 
          
            // Existing chat
            else {
                response = await sendMessage({input, privacySettings, user, conversationId})
                setMessages(prev => [...prev, { sender: 'bot', content: response.content }]);
            }
        } catch (e) {
            console.error('Message send error:', e);
        }
    
        setIsLoading(false);
    };    

    // Privacy 
    const [privacySettings, setPrivacySettings] = useState<Record<string, boolean>>(        
        PII_TYPE_OPTIONS.reduce((acc, type) => ({
            ...acc,
            [type.entity]: true
        }), {})
    )

    const handleTogglePrivacy = useCallback((entity: string) => {
        setPrivacySettings(prev => ({
            ...prev,
            [entity]: !prev[entity]
        }))
    },[])

    return {
        // Chat Messages
        messages,
        isLoading,
        handleSendMessage,
       // Privacy
        privacySettings,
        handleTogglePrivacy

    }
}