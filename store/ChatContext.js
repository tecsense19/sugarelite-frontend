"use client"
import React, { createContext, useContext, useReducer } from 'react';

// Define action types
const ADD_MESSAGE = 'ADD_MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const EDIT_MESSAGE = 'EDIT_MESSAGE';
const ADD_ONLINE_USERS = "ADD_ONLINE_USERS";
const ADD_TYPING_USER = "ADD_TYPING_USER"
const REMOVE_TYPING_USER = "REMOVE_TYPING_USER"

// Define the initial state
const initialState = {
    messages: [],
    onlineUsers: [],
    typingUsers: []
};

// Define the reducer function
const chatReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage = action.payload;
            // Check if the message with the same ID already exists
            const existingMessageIndex = state.messages.findIndex(message => message.id === newMessage.id);
            if (existingMessageIndex === -1) {
                // Message does not exist, add it to the state
                return {
                    ...state,
                    messages: [...state.messages, newMessage],
                };
            } else {
                // Message already exists, return the current state
                return state;
            }
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(message => message.id !== action.payload),
            };
        case EDIT_MESSAGE:
            const updatedMessage = action.payload;
            const updatedMessages = state.messages.map(message => {
                if ((message.id === updatedMessage.id) || (message.id === updatedMessage.pid)) {
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
        case ADD_TYPING_USER:
            return {
                ...state,
                typingUsers: [...state.typingUsers, action.payload]
            }
        case REMOVE_TYPING_USER:
            const obj = action.payload
            return {
                ...state,
                typingUsers: state.typingUsers.filter(user => user.sender_id !== obj.sender_id && user.receiver_id !== obj.receiver_id),
            }
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

    const addTypingUser = (id) => {
        dispatch({ type: ADD_TYPING_USER, payload: id })
    }

    const removerTypingUser = (id) => {
        dispatch({ type: REMOVE_TYPING_USER, payload: id })
    }

    return (
        <ChatContext.Provider value={{ state, addMessage, deleteMessage, editMessage, updateOnlineUsers, addTypingUser, removerTypingUser }}>
            {children}
        </ChatContext.Provider>
    );
};
