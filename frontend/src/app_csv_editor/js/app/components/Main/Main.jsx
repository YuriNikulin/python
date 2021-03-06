import React, { useCallback, useContext, useEffect } from 'react';
import { useStore } from '../../';
import Pagination from '../../../../../common/js/react_components/Pagination';
import Preloader from '../../../../../common/js/react_components/Preloader';
import { addItem, changeFilter, changePage, changeSort, editCell, fetchData, removeItem, setLoading } from '../../store/actions'
import Table from '../Table/Table'
import Toolbar from './Toolbar';

const Main = () => {
    const [state, dispatch] = useStore()

    const handlePaginationChange = useCallback((page) => {
        dispatch(changePage(page))
    }, [dispatch])

    const handleSort = useCallback((value) => {
        dispatch(changeSort(value))
    }, [])

    const handleFilter = useCallback((value) => {
        dispatch(changeFilter(value))
    }, [])

    const handleCellEdit = useCallback((value) => {
        dispatch(editCell(value))
    }, [])

    const handleRemove = useCallback((id) => {
        dispatch(removeItem(id))
    }, [])

    const handleAdd = useCallback((id) => {
        dispatch(addItem(id))
    }, [])

    useEffect(() => {
        dispatch(fetchData({}))
    }, [])

    return (
        <div className="d-flex flex-column flex-grow-1 overflow-hidden">
            <div className="container d-flex flex-column flex-grow-1 overflow-hidden">
                <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                    <Preloader in={state.loading} />
                    <Toolbar filters={state.data.filters} />
                    <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                        <Table
                            data={state.data.data}
                            loading={state.loading}
                            sort={state.data.sort}
                            onSort={handleSort}
                            filters={state.data.filters}
                            onFilter={handleFilter}
                            onCellEdit={handleCellEdit}
                            shouldScrollTop={state.shouldScrollTop}
                            onAdd={handleAdd}
                            onRemove={handleRemove}
                            highlightedItems={state.highlightedItems}
                        />
                    </div>
                </div>
            </div>
            {!!state.data.pagination.total_pages && (
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
