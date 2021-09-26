import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FilterIcon } from 'common/react_components/Icon'
import Menu from 'common/react_components/Menu'
import Button from 'common/react_components/Button'
import classNames from 'classnames';

const Filter = (props) => {
    const { item, filtersDict, onSave, onReset } = props
    const [value, setValue] = useState('')
    const [isStrict, setIsStrict] = useState(false)
    const buttonRef = useRef()

    useEffect(() => {
        if (filtersDict[item.name]) {
            setValue(filtersDict[item.name].value)
            setIsStrict(filtersDict[item.name].strict)
        } else {
            setValue('')
            setIsStrict(false)
        }
    }, [filtersDict])

    const close = () => {
        if (buttonRef.current) {
            const ev = new CustomEvent('close')
            buttonRef.current.dispatchEvent(ev)
        }
    }

    const handleFilterSubmit = useCallback(() => {
        close()
        onSave({
            key: item.name,
            strict: isStrict,
            value,
        })
    }, [value, isStrict, onSave, item.name, close])

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFilterSubmit()
        }
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleStrictChange = (e) => {
        setIsStrict(e.target.checked)
    }

    const handleReset = useCallback(() => {
        close()
        onReset(item.name)
    }, [close, onReset, item])

    return (
        <Menu
            portal={true}
            buttonRef={buttonRef}
            fullWidth={false}
            menuButton={(
                <button
                    title="Отфильтровать"
                    style={{ width: 24 }}
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
                        onKeyDown={handleInputKeyDown}
                        onChange={handleChange}
                        autoFocus
                        value={value}
                    />
                    <div className="form-check mt-2">
                        <label className="form-check-label" htmlFor={`filter-strict-${item.name}`}>
                            <small>
                                Строгое соответствие
                            </small>
                        </label>
                        <input
                            id={`filter-strict-${item.name}`}
                            className="form-check-input filter-input-strict"
                            type="checkbox"
                            onChange={handleStrictChange}
                            checked={isStrict}
                        />
                    </div>
                    <div className="mt-2">
                        <Button small onClick={handleFilterSubmit} data-col-name={item.name}>
                            Применить
                        </Button>
                        {filtersDict[item.name] && (
                            <Button
                                small
                                type="outline-primary"
                                data-col-name={item.name}
                                className="ms-2"
                                onClick={handleReset}
                            >
                                Сбросить
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Menu>
    )
}

export default Filter;
