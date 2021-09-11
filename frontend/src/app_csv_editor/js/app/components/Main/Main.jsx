import React, { useCallback, useContext, useEffect } from 'react';
import { useStore } from '../../';
import Pagination from '../../../../../common/js/react_components/Pagination';
import Preloader from '../../../../../common/js/react_components/Preloader';
import { changePage, fetchData, setLoading } from '../../store/actions'
import Table from '../Table/Table'
import Toolbar from './Toolbar';

const Main = () => {
    const [state, dispatch] = useStore()

    const handlePaginationChange = useCallback((page) => {
        dispatch(changePage(page))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchData({}))
    }, [])

    return (
        <div className="d-flex flex-column flex-grow-1 overflow-hidden">
            <div className="container d-flex flex-column flex-grow-1 overflow-hidden">
                <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                    <Preloader in={state.loading} />
                    <Toolbar />
                    <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                        <Table data={state.data.data} loading={state.loading} />
                    </div>
                </div>
            </div>
            {state.data.pagination.total_pages && (
            <div className="page-footer">
                <div className="container">
                    <div className="row">
                        <Pagination pagination={state.data.pagination} onChange={handlePaginationChange} />
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default Main;
