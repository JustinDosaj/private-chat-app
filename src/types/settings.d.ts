import { IMessage } from "@/types/chat";

export interface ISettingsList {
    entity: string;
    label: string;
}

export interface IAppView {
    className?: string,
    conversationId?: string | null,
}

export interface ISettingsView {
    className?: string,
    privacySettings: Record<string, boolean>,
    handleTogglePrivacy: (entity: string) => void,
    handleToggleAllPrivacy: (checked: boolean) => void
}

export interface IAppInput extends IAppView {
    handleSendMessage: (input: string) => Promise<void>,
}

export interface IMainView extends IAppInput {
    messages: IMessage[]
}