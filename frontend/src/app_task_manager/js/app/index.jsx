import React, { useContext, createContext, useState, useEffect, useReducer } from 'react';
import { Provider } from 'react-redux'
import { store } from './store'
import Homepage from './pages/Homepage/Homepage'

const App = () => {
    return (
        <Provider store={store}>
            <Homepage />
        </Provider>
    )
}

export default App;
