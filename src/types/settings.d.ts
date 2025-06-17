export interface ISettingsList {
    entity: string;
    label: string;
}

export interface IAppView {
    className?: string,
    conversationId?: string | null,
}

export interface IAppInput extends IAppView {
    handleSendMessage: (input: string) => Promise<void>,
}