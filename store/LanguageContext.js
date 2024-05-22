"use client"
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    strings: {
        string_login: {
            english_string: "Login",
            danish_string: "Log på"
        },
        string_register: {
            english_string: "Register",
            danish_string: "Tilmeld"
        }
    },
};

const stringReducer = (state, action) => {

}

const LanguageContext = createContext()

export const useTranslator = () => {
    return useContext(LanguageContext)
}

export const StringProvider = ({ children }) => {
    const [state, dispatch] = useReducer(stringReducer, initialState);

    return (
        <LanguageContext.Provider value={{ state }}>
            {children}
        </LanguageContext.Provider>
    )
}