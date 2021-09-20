import React, { useContext, createContext, useState, useEffect, useReducer, useCallback } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux'
import { changeFilter, fetchTasks, resetFilter } from '../../store/actions';
import { dataSelector, filtersSelector, loadingSelector } from '../../store/selectors';
import List from './components/List'
import Filter from './components/Filter'

const Homepage = () => {
    const loading = useSelector(loadingSelector)
    const { data, pagination } = useSelector(dataSelector)
    const filters = useSelector(filtersSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks())
    }, [])

    const handleFilterChange = useCallback((key, value, strict) => {
        dispatch(changeFilter({ key, value, strict }))
    }, [])

    const handleFilterReset = useCallback(() => {
        dispatch(resetFilter())
    }, [])

    return (
        <div>
            <Filter
                onChange={handleFilterChange}
                onReset={handleFilterReset}
                values={filters}
            />
            <div className="mt-3">
                <List data={data} loading={loading} />
            </div>
        </div>
    )
}

export default Homepage;
