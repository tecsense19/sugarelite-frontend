"use client"
import React, { createContext, useContext, useReducer } from 'react';

// Define action types
const ADD_MESSAGE = 'ADD_MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const EDIT_MESSAGE = 'EDIT_MESSAGE';
const ADD_ONLINE_USERS = "ADD_ONLINE_USERS"

// Define the initial state
const initialState = {
    messages: [],
    onlineUsers: []
};

// Define the reducer function
const chatReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(message => message.id !== action.payload),
            };
        case EDIT_MESSAGE:
            const { updatedMessage } = action.payload;
            const updatedMessages = state.messages.map(message => {
                if (message.id === updatedMessage.id) {
                    return updatedMessage;
                }
                return message;
            });
            return {
                ...state,
                messages: updatedMessages,
            };
        case ADD_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.payload
            };
        default:
            return state;
    }
};

// Create the chat context
const ChatContext = createContext();

// Custom hook to use the chat context
export const useChat = () => {
    return useContext(ChatContext);
};

// Chat provider component
export const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    // Function to add a message to the chat
    const addMessage = (message) => {
        dispatch({ type: ADD_MESSAGE, payload: message });
    };

    // Function to delete a message from the chat
    const deleteMessage = (messageId) => {
        dispatch({ type: DELETE_MESSAGE, payload: messageId });
    };

    // Function to edit a message in the chat
    const editMessage = (message) => {
        dispatch({ type: EDIT_MESSAGE, payload: message });
    };

    const updateOnlineUsers = (arr) => {
        dispatch({ type: ADD_ONLINE_USERS, payload: arr })
    }

    return (
        <ChatContext.Provider value={{ state, addMessage, deleteMessage, editMessage, updateOnlineUsers }}>
            {children}
        </ChatContext.Provider>
    );
};
