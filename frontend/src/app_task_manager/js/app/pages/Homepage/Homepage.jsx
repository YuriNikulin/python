import React, { useContext, createContext, useState, useEffect, useReducer, useCallback } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux'
import { changeFilter, changePagination, fetchTasks, resetFilter } from '../../store/actions';
import { dataSelector, filtersSelector, loadingSelector, shouldSrollTopSelector } from '../../store/selectors';
import List from './components/List'
import Filter from './components/Filter'
import Pagination from 'common/react_components/Pagination'
import makeRequest from 'common/request'
import { sleep } from 'common/utils'

const Homepage = () => {
    const loading = useSelector(loadingSelector)
    const { data, pagination } = useSelector(dataSelector)
    const filters = useSelector(filtersSelector)
    const dispatch = useDispatch()
    const shouldScrollTop = useSelector(shouldSrollTopSelector)

    const createTasks = async () => {
        let i = 1
        while (i < 200) {
            makeRequest('/api/task_manager/task/create', {
                method: 'POST',
                body: {
                    name: `task_${i}`
                }
            })
            await sleep(1000)
            i++
        }
    }

    useEffect(() => {
        dispatch(fetchTasks())
    }, [])

    useEffect(() => {
        if (shouldScrollTop) {
            window.scrollTo({
                top: 0
            })
        }
    }, [shouldScrollTop])

    const handleFilterChange = useCallback((key, value, strict) => {
        dispatch(changeFilter({ key, value, strict }))
    }, [])

    const handleFilterReset = useCallback(() => {
        dispatch(resetFilter())
    }, [])

    const changePage = useCallback((page) => {
        dispatch(changePagination(page))
    }, [])

    return (
        <>
            <div className="container">
                <Filter
                    onChange={handleFilterChange}
                    onReset={handleFilterReset}
                    values={filters}
                />
                <div className="mt-3" style={{ minHeight: 500 }}>
                    <List data={data} loading={loading} />
                </div>
            </div>
            {pagination.total_items &&
                <div className="page-footer">
                    <div className="container">
                        <div className="row">
                            <Pagination pagination={pagination} onChange={changePage} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Homepage;
