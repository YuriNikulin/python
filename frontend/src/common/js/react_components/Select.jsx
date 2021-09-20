import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import Menu from './Menu';
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from './Icon'

const Select = (props) => {
    const inputRef = useRef()
    const containerRef = useRef()
    const [inputFocused, setInputFocused] = useState(false)
    const [menuFocused, setMenuFocused] = useState(false)
    const [menuState, setMenuState] = useState('closed')
    const [menuId] = useState(`menu-${parseInt(Math.random() * 1000)}`)
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
        if (e.key === 'Escape') {
            shouldResetBlur.current = false
            close()
        }
    }

    const handleInputFocus = () => {
        shouldResetBlur.current = true
        setInputFocused(true)
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
        if (!e.target.matches(`#${menuId} *`)) {
            close()
        }
    }

    const handleChange = useCallback(({ value }) => {
        props.onChange(value)
        close()
    }, [close])

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

    const inputValue = useMemo(() => {
        return menuState === 'open' ? props.inputValue : props.value?.name || ''
    }, [props.value, menuState, props.inputValue])

    const placeholder = useMemo(() => {
        return menuState === 'open' ? props.value?.name || props.placeholder : props.placeholder
    }, [props.placeholder, props.value, menuState])

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
                    const isActive = childId === props.value?.id
                    return (
                        React.cloneElement(child, {
                            className: classNames({
                                'szh-menu__item--active': isActive,
                                [child.props.className]: !!child.props.className
                            })
                        })
                    )
                })}
            </Menu>
            <div className="select-buttons text-gray">
                {props.value && (
                    <button className='reset-button text-hover-danger' onClick={clear}>
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
        </div>
    )
}

export default Select