import { createContext, useReducer } from "react";

interface MessagesContextType {
    messages: [];
    addMessage: (message: string) => void;
    setMessages: (messages: object[]) => void;
}

export const MessagesContext = createContext<MessagesContextType>({
    messages: [],

    addMessage: () => {
        console.log("bob");
    },
    setMessages: messages => {},
});

function messageReducer(state: object[], action: { type: string; payload: any }) {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "SET":
            return action.payload;
        default:
            return state;
    }
}

import { ReactNode } from "react";

export function MessageContextProvider({ children }: { children: ReactNode }) {
    const [messageState, dispatch] = useReducer(messageReducer, []);

    function addMessage(message: string) {
        dispatch({ type: "ADD", payload: message });
    }

    function setMessages(messages: object[]) {
        dispatch({ type: "SET", payload: messages });
    }

    const value = {
        messages: messageState,
        addMessage,
        setMessages,
    };

    return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
}
