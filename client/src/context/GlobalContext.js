import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducers';

// Initial State
const initialState = {
  datas: []
}

// Create Context
export const GlobalContext = createContext(initialState);


// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  
  // Actions
  const loadData = () => {
    return function (dispatch){
      axios.get("http://localhost:8800/api/request")
      .then((res) => {
        dispatch(loadUser(res.data)).catch((error) => console.log(error))
      })
    }
  }
  loadData()
  
  const loadUser = (data) => {
    dispatch({
      type: 'LOAD_USER',
      payload: data
    })
  }
  const removeUser = (id) => {
    dispatch({
      type: 'REMOVE_USER',
      payload: id
    })
  }

  const addUser = (user) => {
    dispatch({
      type: 'ADD_USER',
      payload: user
    })
  }

  const editUser = (user) => {
    dispatch({
      type: 'EDIT_USER',
      payload: user
    })
  }

  return (
    <GlobalContext.Provider value={{
      users: state.users,
      loadUser,
      removeUser,
      addUser,
      editUser
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

