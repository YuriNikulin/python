import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, EditIcon, TrashIcon, AddIcon } from 'common/react_components/Icon'
import classNames from 'classnames';
import Filter from './Filter'

const Table = (props) => {
    const { data } = props
    const containerRef = useRef()
    const [editedCell, setEditableCell] = useState({})

    const handleSort = (key) => {
        const value = {
            key,
            value: props.sort.key === key && props.sort.value === 'desc' ? 'asc' : 'desc'
        }

        props.onSort(value)
    }

    const handleFilterSubmit = useCallback(({key, value, strict}) => {
        props.onFilter({
            key,
            value,
            strict
        })

    }, [props.onFilter])

    const handleFilterReset = useCallback((key) => {
        props.onFilter({
            key,
            value: null
        })
    }, [])

    const filtersDict = useMemo(() => {
        const dict = {}
        props.filters.forEach(filter => {
            const key = filter.key
            dict[key] = filter
        })

        return dict
    }, [props.filters])

    const startEditCell = (row, index) => {
        const rowId = row[0]
        setEditableCell({
            id: rowId,
            columnIndex: index,
            value: row[index]
        })
    }

    const cancelEditCell = () => {
        setEditableCell({})
    }

    const handleEditedCellChange = (e) => {
        setEditableCell({
            ...editedCell,
            value: e.target.value
        })
    }

    const handleEditedCellKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.onCellEdit(editedCell)
        } else if (e.key === 'Escape') {
            cancelEditCell()
        }
    }

    const handleAdd = (row) => {
        props.onAdd(row[0])
    }

    const handleRemove = (row) => {
        props.onRemove(row[0])
    }

    useEffect(() => {
        const inputs = document.querySelectorAll('.filter-input')
        inputs.forEach(input => {
            const key = input.dataset.colName
            if (!filtersDict[key]) {
                input.value = ''
                const strictInput = input.parentNode.querySelector(`#filter-strict-${key}`)
                if (strictInput) {
                    strictInput.checked = false
                }
            }

        })
    }, [props.filters])

    useEffect(() => {
        if (!props.loading) {
            cancelEditCell()
        }
    }, [props.loading])

    useEffect(() => {
        if (containerRef.current && props.shouldScrollTop) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }, [props.shouldScrollTop])

    return (
        <div className="mt-4 page-table" ref={containerRef}>
            {/* <table className="table table-bordered ce-table" style={{minWidth: tableMinWidth}}> */}
            <table className="table table-bordered ce-table" >
                <thead>
                    <tr>
                        {data.keys.map(item => {
                            if (!item.show) {
                                return null
                            }
                            const isSorted = item.name === props.sort.key
                            return (
                                <th key={item.name}>
                                    <div className="d-flex">
                                        <span>
                                            {item.name}
                                        </span>
                                        <div className="d-flex">
                                            <button
                                                title={
                                                    props.sort.value === 'desc'
                                                        ? "Отсортировать по возрастанию"
                                                        : "Отсортировать по убыванию"
                                                }
                                                className={classNames("reset-button text-hover-primary px-1", {
                                                    "text-primary": isSorted
                                                })}
                                                style={{ width: 24 }}
                                                onClick={() => handleSort(item.name)}>
                                                {isSorted && props.sort.value === 'desc'
                                                    ? <ChevronUpIcon /> : <ChevronDownIcon />
                                                }

                                            </button>
                                            <Filter
                                                item={item}
                                                filtersDict={filtersDict}
                                                onReset={handleFilterReset}
                                                onSave={handleFilterSubmit}
                                            />
                                    </div>
                                </div>
                                </th>
                            )
                        })}
                        <th></th>
                </tr>
            </thead>
            <tbody>
                {!data.values.length ? (
                    <tr>
                        <td colspan={9999}>
                            Ничего не найдено
                        </td>
                    </tr>
                ) : data.values.map((row, index) => {
                        const rowId = row[0]
                        return (
                            <tr key={index} className={classNames({
                                'table-success': props.highlightedItems[row[0]]
                            })}>
                                {row.map((cell, index) => {
                                    const isEdited = editedCell.id === rowId && editedCell.columnIndex === index
                                    return (
                                        <td 
                                            key={index}
                                            className={classNames({
                                                "edited": isEdited
                                            })}
                                        >
                                            <div>
                                                {isEdited
                                                    ? (
                                                        <div>
                                                            <input 
                                                                className="form-control"
                                                                value={editedCell.value}
                                                                autoFocus
                                                                onChange={handleEditedCellChange}
                                                                onKeyDown={handleEditedCellKeyDown}
                                                                onBlur={cancelEditCell}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span>
                                                                {cell}
                                                            </span>
                                                            {data.keys[index].isEditable &&
                                                                <div className="ce-table-cell-overlay">
                                                                    <button
                                                                        title="Редактировать"
                                                                        className="reset-button text-gray text-hover-primary"
                                                                        onClick={(e) => startEditCell(row, index)}
                                                                    >
                                                                        <EditIcon size={20} />
                                                                    </button>
                                                                </div>
                                                            }
                                                        </div>
                                                    )}
                                            
                                            </div>
                                        </td>
                                    )
                                })}
                                <td style={{verticalAlign: "middle"}}>
                                    <div className="d-flex align-center justify-content-center p-0">
                                        <button 
                                            className="reset-button text-hover-primary px-1"
                                            style={{
                                                width: 40
                                            }}
                                            title="Добавить запись"
                                            onClick={() => handleAdd(row)}
                                        >
                                            <AddIcon />
                                        </button>
                                        <button 
                                            className="reset-button text-hover-danger px-1"
                                            style={{
                                                width: 40
                                            }}
                                            title="Удалить запись"
                                            onClick={() => handleRemove(row)}
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                })}
            </tbody>
        </table>
        </div >
    )
}

export default Table;
