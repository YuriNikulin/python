import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'common/react_components/Modal'
import Button from 'common/react_components/Button'
import { useStore } from '../..';
import { changeShownColumns } from '../../store/actions';

const ColumnsSettings = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [values, setValues] = useState({})
    const [state, dispatch] = useStore()

    const handleButtonClick = useCallback(() => {
        setIsOpen(true)
    }, [])

    const handleClose = useCallback(() => {
        setIsOpen(false)
    }, [])

    const handleChange = useCallback((col) => {
        setValues({
            ...values,
            [col.name]: !values[col.name]
        })
    }, [values])

    const handleSubmit = useCallback(() => {
        dispatch(changeShownColumns(values))
        handleClose()
    }, [values])

    useEffect(() => {
        if (isOpen) {
            let newValues = {}
            if (Object.keys(state.data.columns).length) {
                newValues = state.data.columns
            } else {
                newValues = state.data.data.keys.reduce((acc, curr) => {
                    return {
                        ...acc,
                        [curr.name]: true
                    }
                }, {})
            }

            setValues(newValues)
        }
    }, [isOpen])

    return (
        <>
            <Button className="ms-3" onClick={handleButtonClick}>
                Показать / скрыть столбцы
            </Button>
            <Modal 
                isOpen={isOpen}
                onClose={handleClose}
                title="Показать / скрыть столбцы"
                footer={(
                    <div>
                        <Button onClick={handleSubmit}>
                             Сохранить
                        </Button>
                        <Button type="outline-primary" className="ms-3" onClick={handleClose}>
                             Отменить
                        </Button>
                    </div>
                )}
            >
                {state.data.data.keys.map((col) => {
                    return (
                        <div className="form-check">
                            <input 
                                disabled={col.isMandatory}
                                className="form-check-input"
                                type="checkbox"
                                id={`columns-settings-${col.name}`}
                                checked={values[col.name]}
                                onChange={() => handleChange(col)}
                            />
                            <label className="form-check-label" htmlFor={`columns-settings-${col.name}`}>
                                {col.name}
                            </label>
                        </div>
                    )
                })}
            </Modal>
        </>
    )
}

export default ColumnsSettings;
