import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import Menu from './Menu';
import Button from './Button';
import Modal from './Modal';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon } from './Icon'

const Select = (props) => {
    const inputRef = useRef()
    const containerRef = useRef()
    const [inputFocused, setInputFocused] = useState(false)
    const [menuFocused, setMenuFocused] = useState(false)
    const [menuState, setMenuState] = useState('closed')
    const [isCreating, setIsCreating] = useState(false)
    const [creatingValue, setCreatingValue] = useState('')
    const [menuId] = useState(props.id || `menu-${parseInt(Math.random() * 1000)}`)
    const shouldResetBlur = useRef()
    const isFirstRender = useRef(true)

    const handleInputChange = (e) => {
        const value = e.target.value
        if (props.onInputChange) {
            props.onInputChange(value)
        }
    }

    const close = () => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        shouldResetBlur.current = false
        setMenuState('closed')
        if (!inputRef.current) {
            return
        }
        inputRef.current.blur()
        if (props.onInputChange) {
            props.onInputChange('')
        }
    }

    const open = () => {
        setMenuState('open')
    }

    const handleInputBlur = (e) => {
        if (shouldResetBlur.current) {
            e.target.focus()
            return
        }

        setInputFocused(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape' || e.key === 'Tab') {
            shouldResetBlur.current = false
            close()
        }
    }

    const handleInputFocus = () => {
        shouldResetBlur.current = true
        setInputFocused(true)
        if (document.activeElement !== inputRef.current) {
            inputRef.current.focus()
        }
    }

    const handleMenuFocus = () => {
        setMenuFocused(true)
    }

    const handleMenuBlur = () => {
        setMenuFocused(false)
    }

    useEffect(() => {
        if (!inputFocused && !menuFocused) {
            close()
        } else {
            open()
        }
    }, [inputFocused, menuFocused])

    const handleWindowClick = (e) => {
        if (!e.target.matches(`#${menuId}, #${menuId} *`)) {
            close()
        }
    }

    const handleChange = useCallback(({ value }) => {
        let _value = value

        if (props.multi) {
            if (!_value) {
                props.onChange(_value)
                return
            }
            const propsValue = props.value || []
            const existingValueIndex = propsValue.findIndex(v => v.id === _value.id)
            if (existingValueIndex !== -1) {
                _value = [
                    ...propsValue.slice(0, existingValueIndex),
                    ...propsValue.slice(existingValueIndex + 1)
                ]
            } else {
                _value = [...propsValue, _value]
            }
        }
        props.onChange(_value)
        if (!props.multi) {
            close()
        }
    }, [close, props.multi, props.value, props.multi])

    const clear = () => {
        handleChange({ value: '' })
    }

    useEffect(() => {
        if (menuState === 'open') {
            if (props.onOpen) {
                props.onOpen()
            }
            window.addEventListener('click', handleWindowClick)

            return () => {
                window.removeEventListener('click', handleWindowClick)
            }
        }
    }, [menuState])

    const multiInputValue = useMemo(() => {
        if (props.multi && props.value) {
            return props.value.map(v => v.name).join(', ')
        }
    }, [props.value])

    const multiInputDict = useMemo(() => {
        if (props.multi && Array.isArray(props.value) && props.value) {
            return props.value.reduce((acc, curr) => {
                return {
                    ...acc,
                    [curr.id]: curr
                }
            }, {})
        }
    }, [props.value])

    const toggleIsCreating = useCallback((value) => {
        setIsCreating(value !== undefined ? value : !isCreating)
        close()
    }, [isCreating, close])

    const handleCreatingValueChange = useCallback((e) => {
        setCreatingValue(e.target.value)
    }, [])

    const handleCreatingValueSave = useCallback(async () => {
        setIsCreating(false)
        setCreatingValue('')
        const newTag = await props.onCreate(creatingValue)
        inputRef.current.focus()
        setMenuFocused(true)
        setInputFocused(true)
        handleChange({ value: newTag })
    }, [creatingValue, props.onCreate, handleChange])

    const inputValue = useMemo(() => {
        return menuState === 'open' ? props.inputValue : multiInputValue || props.value?.name || ''
    }, [props.value, menuState, props.inputValue, multiInputValue])

    const placeholder = useMemo(() => {
        return menuState === 'open' ? multiInputValue || props.value?.name || props.placeholder : props.placeholder
    }, [props.placeholder, props.value, menuState, multiInputValue])

    const isOpen = useMemo(() => menuState === 'open', [menuState])

    const input = (
        <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="form-control"
            onKeyDown={handleKeyDown}
            ref={inputRef}
            placeholder={placeholder || 'Не задано'}
            value={inputValue}
            onChange={handleInputChange}
            id={props.inputId}
            title={multiInputValue || inputValue || placeholder}
        />
    )

    return (
        <div ref={containerRef} id={menuId} className={classNames('select', {
            'open': isOpen
        })}>
            {input}
            <Menu
                onFocus={handleMenuFocus}
                onBlur={handleMenuBlur}
                anchorRef={containerRef}
                menuState={menuState}
                onItemClick={handleChange}
                {...props}
            >
                {React.Children.map(props.children, (child) => {
                    const childId = child.props.value?.id || null
                    const isActive =
                        !props.multi
                            ?
                            childId === props.value?.id
                            :
                            multiInputDict && multiInputDict[childId]
                    return (
                        React.cloneElement(child, {
                            className: classNames({
                                'szh-menu__item--active': isActive,
                                [child.props.className]: !!child.props.className
                            })
                        })
                    )
                })}
                {props.onCreate && (
                    <div className="select-footer">
                        <Button small onClick={toggleIsCreating}>
                            {props.onCreateText || 'Добавить'}
                        </Button>
                    </div>
                )}
            </Menu>
            <div className="select-buttons text-gray" onClick={handleInputFocus}>
                {props.value && (
                    <button className='reset-button text-hover-danger' onClick={(e) => {
                        e.stopPropagation()
                        clear()
                    }}>
                        <CloseIcon size={20} />
                    </button>
                )}
                <button className={classNames('reset-button', {
                    'text-primary': isOpen
                })}>
                    {!isOpen ?
                        <ChevronDownIcon /> : <ChevronUpIcon />}
                </button>
            </div>
            {props.onCreate && (
                <Modal
                    isOpen={isCreating}
                    title={props.onCreateText}
                    onClose={() => toggleIsCreating(false)}
                    footer={<div>
                        <Button onClick={handleCreatingValueSave} data-trigger-enter>
                            Сохранить
                        </Button>
                        <Button
                            outline
                            onClick={() => toggleIsCreating(false)}
                            className="ms-3"
                        >
                            Отменить
                        </Button>
                    </div>}
                >
                    <div className="select-create">
                        <input
                            className="form-control form-control-sm"
                            placeholder={props.onCreateText}
                            value={creatingValue}
                            onChange={handleCreatingValueChange}
                        />
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default Select