"use client"
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  isOpenMobileNavbar: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case true:
      return { ...state, isOpenMobileNavbar: true };
    case false:
      return { ...state, isOpenMobileNavbar: false };
    default:
      return state;
  }
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'Filter_Open':
      return { ...state, isFilterOpen: true };
    case 'Filter_Close':
      return { ...state, isFilterOpen: false };
    default:
      return state;
  }
}

const StoreContext = createContext();

const rootReducer = ({ firstState, filterState }, action) => ({
  firstState: reducer(firstState, action),
  filterState: filterReducer(filterState, action)
});


export const StoreProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [state, dispatch] = useReducer(rootReducer, {
    firstState: initialState,
    filterState: {
      isFilterOpen: false,
    }
  });

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
