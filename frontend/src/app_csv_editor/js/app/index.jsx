import React, { useContext, createContext, useState, useEffect, useReducer } from 'react';
import Main from './components/Main/Main';
import { initialState, reducer } from './store/reducer';
import { setLoading } from './store/actions'

const AppState = {
    loading: false
}

export const AppStateContext = createContext()
export const useStore = () => useContext(AppStateContext)
export let getState

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const _dispatch = (fn) => {
        dispatch(fn(state, dispatch))
    }

    getState = () => state

    return (
        <AppStateContext.Provider value={[state, _dispatch]}>
            <Main />
        </AppStateContext.Provider>
    )
}

export default App;
