import { PII_TYPE_OPTIONS } from "@/config/options.config"
import { IAppView } from "@/types/settings";
import { useChat } from "@/hooks/useChat";
//import { useState } from "react";
import { Button } from "../Button";

// @TODO: Add Select All and Deselect All buttons to handle both cases of when a user unchecks or checks multiple selections

export default function Settings({ className, conversationId }: IAppView) {
    
    const { privacySettings, handleTogglePrivacy, handleToggleAllPrivacy } = useChat(conversationId);

    return (
        <div className={`${className} border-l border-slate-300/40 p-6 bg-slate-50 overflow-y-scroll`}>
            <fieldset>
                <legend className="text-lg font-semibold text-slate-900">Privacy Options</legend>
                <p className="max-w-2xl tracking-tight text-slate-700">Select what information you want to remain private</p>
                <div className="mt-4 divide-y divide-slate-300/40 border-t border-b border-slate-300/40 grid grid-cols-2">
                    {PII_TYPE_OPTIONS.map((type) => (
                    <div key={type.entity} className="relative flex gap-3 py-1 items-center">
                        <div className="flex h-6 shrink-0 items-center">
                            <input
                                id={`${type.entity}`}
                                name={`${type.entity}`}
                                checked={privacySettings[type.entity]}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                onChange={() => handleTogglePrivacy(type.entity)}
                            />
                        </div>
                        <div className="min-w-0 flex-1 text-sm/6">
                            <label htmlFor={`${type.entity}`} className="inline-block rounded-lg px-2 text-sm text-slate-700">
                                {type.label}
                            </label>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="w-full space-x-4 flex justify-end py-4">
                    <Button onClick={() => handleToggleAllPrivacy(false)}>Deselect All</Button>
                    <Button onClick={() => handleToggleAllPrivacy(true)}>Select All</Button>
                </div>
            </fieldset>
        </div>
    )
}
  