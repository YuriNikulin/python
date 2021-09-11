import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactPaginate from 'react-paginate';

const defaultParams = {
    pageRangeDisplayed: 30,
    marginPagesDisplayed: 10
}

const Pagination = ({ pagination, onChange }) => {
    const params = useMemo(() => {
        return {
            ...defaultParams,
            pageCount: pagination.total_pages,
            pageRangeDisplayed: pagination.range,
            marginPagesDisplayed: pagination.margin,
            forcePage: pagination.page - 1
        }
    }, [pagination])

    const handlePageChange = useCallback(({ selected }) => {
        onChange(selected + 1)
    }, [onChange])


    if (!params.pageCount) {
        return null
    }
    
    return (
        <div className="d-flex align-items-center">
            <ReactPaginate
                containerClassName="pagination mb-0"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousLabel={(
                    <span aria-hidden="true">&laquo;</span>
                )}
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextLabel={(
                    <span aria-hidden="true">&raquo;</span>
                )}
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName=""
                breakLinkClassName="d-block h-100 px-3 text-decoration-none"
                activeClassName="active"
                onPageChange={handlePageChange}
                {...params}
            />
            {pagination.total_items && (
                <small className="align-self-center ms-3">
                    Всего: {pagination.total_items}
                </small>
            )}
        </div>
    )
}

Pagination.propTypes = {
    in: PropTypes.bool
}

export default Pagination