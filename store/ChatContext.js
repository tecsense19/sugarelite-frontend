"use client"
import React, { createContext, useContext, useReducer } from 'react';

// Define action types
const ADD_ALL_MESSAGES = "ADD_ALL_MESSAGES"
const ADD_MESSAGE = 'ADD_MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const EDIT_MESSAGE = 'EDIT_MESSAGE';
const ADD_ONLINE_USERS = "ADD_ONLINE_USERS";
const ADD_TYPING_USER = "ADD_TYPING_USER"
const REMOVE_TYPING_USER = "REMOVE_TYPING_USER"
const ADD_COUNT = "ADD_COUNT"
const UPDATE_COUNT = "UPDATE_COUNT"
const REMOVE_COUNT = 'REMOVE_COUNT'

// Define the initial state
const initialState = {
    messages: [],
    onlineUsers: [],
    typingUsers: [],
    unReadCount: []
};

// Define the reducer function
const chatReducer = (state, action) => {
    switch (action.type) {
        case ADD_ALL_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        // case ADD_MESSAGE:
        //     const newMessage = action.payload;
        //     // Check if the message with the same ID already exists
        //     const existingMessageIndex = state.messages.findIndex(message => message.id === newMessage.id);
        //     if (existingMessageIndex === -1) {
        //         // Message does not exist, add it to the state
        //         return {
        //             ...state,
        //             messages: [...state.messages, newMessage],
        //         };
        //     } else {
        //         // Message already exists, return the current state
        //         return state;
        //     }
        case ADD_MESSAGE:
            const newMessage = action.payload;
            return {
                ...state,
                messages: [...state.messages, newMessage]
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
        case ADD_COUNT:
            const item = action.payload
            const isExist = state.unReadCount.some(i => i.id === item.id)
            if (isExist) {
                return state
            } else {
                return {
                    ...state,
                    unReadCount: [...state.unReadCount, action.payload]
                }
            }
        case UPDATE_COUNT:
            const id = action.payload
            const updatedCount = state.unReadCount.map((user) => {
                if (user.id === id) {
                    return { ...user, count: user.count + 1 }
                }
                return user
            })
            return {
                ...state,
                unReadCount: updatedCount
            }
        case REMOVE_COUNT:
            const removeId = action.payload;
            const filteredCount = state.unReadCount.filter((user) => user.id !== removeId);
            return {
                ...state,
                unReadCount: filteredCount
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

    const addAllMessages = (arr) => {
        dispatch({ type: ADD_ALL_MESSAGES, payload: arr });
    }

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

    const addUnReadCount = (obj) => {
        dispatch({ type: ADD_COUNT, payload: obj })
    }

    const updateUnReadCount = (id) => {
        dispatch({ type: UPDATE_COUNT, payload: id })
    }

    const removeUnReadCount = (id) => {
        dispatch({ type: REMOVE_COUNT, payload: id })
    }

    return (
        <ChatContext.Provider value={{ state, addAllMessages, addMessage, deleteMessage, editMessage, updateOnlineUsers, addTypingUser, removerTypingUser, addTypingUser, addUnReadCount, updateUnReadCount, removeUnReadCount }}>
            {children}
        </ChatContext.Provider>
    );
};
