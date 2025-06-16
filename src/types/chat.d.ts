import { IconType } from "react-icons/lib"

export interface IConversations {
    conversationId: string,
    title: string,
    createdAt: number,
    lastUpdated: number,
    type: string,
    userId: string,
}

export interface IEdit {
    title: string,
    conversationId: string,
}

export interface IMessage {
    sender: 'user' | 'bot',
    content: string,
}

export interface IResponse {
    content: string,
    conversationId: string,
}

export type ChatModelOption = {
    name: string,
    value: string,
}

export type ChatModelGroup = {
    label: string,
    icon: IconType,
    models: ChatModelOption[]
}