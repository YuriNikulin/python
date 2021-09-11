import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon, FilterIcon } from 'common/react_components/Icon'
import Menu from 'common/react_components/Menu'
import Button from 'common/react_components/Button'
import classNames from 'classnames';

const Table = (props) => {
    const { data } = props
    const containerRef = useRef()

    useEffect(() => {
        if (containerRef.current && !props.loading) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }, [props.loading])
    
    const handleSort = (key) => {
        const value = {
            key,
            value: props.sort.key === key && props.sort.value === 'desc' ? 'asc' : 'desc'
        }

        props.onSort(value)
    }

    const closeFilter = (key) => {
        const toggler = document.querySelector(`#filter-toggler-${key}`)
        if (toggler) {
            const ev = new CustomEvent('close')
            toggler.dispatchEvent(ev)
        }
    }

    const handleFilterSubmit = useCallback((e) => {
        const key = e.target.dataset.colName
        closeFilter(key)
        const input = document.querySelector(`#filter-${key}`)
        if (input) {
            const value = input.value
            const strict = document.querySelector(`#filter-strict-${key}`)
            props.onFilter({
                key,
                value,
                strict: strict.checked
            })
        }

    }, [props.onFilter])

    const handleFilterReset = useCallback((e) => {
        const key = e.target.dataset.colName
        closeFilter(key)
        props.onFilter({
            key,
            value: null
        })
    }, [])

    const handleFilterInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFilterSubmit(e)
        }
    }

    const handleFilterToggle = (key, e) => {
        let input = document.querySelector(`#filter-${key}`)
        if (input) {
            setTimeout(() => {
                input.focus()
            }, 50)
        }
    }

    const filtersDict = useMemo(() => {
        const dict = {}
        props.filters.forEach(filter => {
            const key = filter.key
            dict[key] = filter
        })
        
        return dict
    }, [props.filters])

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

    return (
        <div className="mt-4 page-table" ref={containerRef}>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {data.keys.map(item => {
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
                                                style={{width: 24}}
                                                onClick={() => handleSort(item.name)}>
                                                    {isSorted && props.sort.value === 'desc'
                                                        ? <ChevronUpIcon /> : <ChevronDownIcon />
                                                    }
                                                    
                                            </button>
                                            <Menu
                                                portal={true}
                                                onOpen={(e) => handleFilterToggle(item.name, e)}
                                                menuButton={(
                                                    <button
                                                        title="Отфильтровать"
                                                        style={{width: 24}}
                                                        id={`filter-toggler-${item.name}`}
                                                        className={classNames("reset-button text-hover-primary px-1", {
                                                            "text-primary": filtersDict[item.name],
                                                        })}
                                                    >
                                                        <FilterIcon size={16} />
                                                    </button>
                                                )}
                                            >
                                                <div className="px-3 py-2">
                                                    <div>
                                                        <input
                                                            placeholder="Отфильтровать"
                                                            className="form-control form-control-sm filter-input"
                                                            id={`filter-${item.name}`}
                                                            data-col-name={item.name}
                                                            onKeyDown={handleFilterInputKeyDown}
                                                            autoFocus
                                                        />
                                                        <div className="form-check mt-2">
                                                            <label className="form-check-label" htmlFor={`filter-strict-${item.name}`}>
                                                                <small>
                                                                    Строгое соответствие
                                                                </small>
                                                            </label>
                                                            <input id={`filter-strict-${item.name}`} className="form-check-input filter-input-strict" type="checkbox" />
                                                        </div>
                                                        <div className="mt-2">
                                                            <Button small onClick={handleFilterSubmit} data-col-name={item.name}>
                                                                Применить
                                                            </Button>
                                                            {filtersDict[item.name] && (
                                                                <Button small type="outline-primary" data-col-name={item.name} className="ms-2" onClick={handleFilterReset}>
                                                                    Сбросить
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Menu>
                                        </div>
                                    </div>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.values.map((row, index) => {
                        return (
                            <tr key={index}>
                                {row.map((cell, index) => {
                                    return (
                                        <td key={index}>
                                            {cell}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
