import React, { useContext, createContext, useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux'
import { fetchTasks } from '../../store/actions';
import { loadingSelector } from '../../store/selectors';

const Homepage = () => {
    const loading = useSelector(loadingSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks())
    }, [])

    return (
        <div>
            homepage
        </div>
    )
}

export default Homepage;
