import React, { useContext, createContext, useState, useEffect, useReducer, useMemo, useRef, useCallback } from 'react';
import classNames from 'classnames'
import { EditIcon, CloseIcon, CheckIcon } from 'common/react_components/Icon'

const Field = (props) => {
    const [isEdited, setIsEdited] = useState(props.alwaysEdited || props.isCreate)
    const prevIsEdited = useRef()
    const containerRef = useRef()
    const shouldToggleIsEdited = useRef(false)

    const toggleIsEdit = () => {
        setIsEdited(!isEdited)
    }

    const handleSave = () => {
        props.onSave(props.name)
        if (!props.alwaysEdited && !props.isCreate) {
            toggleIsEdit()
        }
    }

    const handleInputKeydown = (e) => {
        if (e.key === 'Escape') {
            toggleIsEdit()
        } else if (e.key === 'Enter') {
            handleSave()
        }
    }

    const handleChange = useCallback((e) => {
        let value = e.target?.value !== undefined ? e.target.value : e
        props.onChange(props.name, value)
    }, [props.onChange, props.name])

    useEffect(() => {
        if (props.alwaysEdited || props.isCreate) {
            return
        }

        if (isEdited) {
            const input = containerRef.current.querySelector('input, textarea')
            if (input) {
                input.addEventListener('keydown', handleInputKeydown)
                return () => {
                    input.removeEventListener('keydown', handleInputKeydown)
                }
            }
        }
    }, [handleInputKeydown])

    useEffect(() => {
        if (!props.alwaysEdited && !props.isCreate && isEdited) {
            const input = containerRef.current.querySelector('input, textarea')
            if (input) {
                input.focus()
            }
        }
    }, [isEdited])

    const ctrlListener = (e) => {
        if (e.key === 'Control') {
            shouldToggleIsEdited.current = false
        }
    }

    const handleContainerMouseUp = (e) => {
        if (props.readonly) return
        window.removeEventListener('keydown', ctrlListener)

        if (shouldToggleIsEdited.current) {
            shouldToggleIsEdited.current = false
            toggleIsEdit()
        }
    }

    const handleContainerMouseDown = (e) => {
        if (isEdited || props.readonly) {
            return
        }

        shouldToggleIsEdited.current = true
        window.addEventListener('keydown', ctrlListener)
    }

    const isDirty = useMemo(() => {
        if (props.value === undefined || !props.originalValue === undefined) {
            return false
        }

        const valueId = props.value?.id || props.value
        const originalValueId = props.originalValue?.id || props.originalValue

        if (valueId && originalValueId) {
            return valueId !== originalValueId
        }

        return props.value !== props.originalValue
    }, [props.value, props.originalValue])

    return (
        <div
            className={classNames('field', {
                edited: isEdited,
                editable: !props.readonly,
                fullWidth: props.fullWidth
            })}
            ref={containerRef}
            onMouseUp={handleContainerMouseUp}
            onMouseDown={handleContainerMouseDown}
        >
            {props.title && (
                <h5 className="field-title title">
                    {props.title}
                </h5>
            )}
            <div className="field-content">
                {
                    isEdited
                        ?
                        React.cloneElement(props.editComponent, {
                            onChange: handleChange,
                            placeholder: props.title || props.editComponent.props.placeholder,
                            value: props.value
                        })
                        :
                        props.readComponent

                }
            </div>
            {!props.readonly && !props.isCreate &&
                <div className="field-buttons">
                    {isEdited && isDirty && (
                        <button
                            className="reset-button"
                            title="Сохранить"
                            onClick={handleSave}
                        >
                            <CheckIcon size={24} />
                        </button>
                    )}
                    {!props.alwaysEdited &&
                        <button
                            className={classNames("reset-button", {
                                'text-hover-danger': isEdited
                            })}
                            title={isEdited ? 'Отменить' : 'Редактировать'}
                            onClick={toggleIsEdit}
                        >
                            {isEdited ? <CloseIcon size={24} /> :
                                <EditIcon size={18} />}
                        </button>
                    }
                </div>
            }
        </div>
    )
}

export default Field;
