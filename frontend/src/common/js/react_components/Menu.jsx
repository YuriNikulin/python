import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    MenuItem,
    MenuButton,
    ControlledMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import classNames from 'classnames';

const _Menu = ({menuButton, children, fullWidth = true, ...props}) => {
    const [menuState, setMenuState] = useState('closed')
    const menuButtonRef = useRef()
    const menuRef = useRef()

    const handleMenuButtonClick = useCallback((e) => {
        const newState = menuState === 'closed' ? 'open' : 'closed'
        setMenuState(newState)

        if (menuButton.props.onMouseDown) {
            menuButton.props.onMouseDown(e)
        }

    }, [menuButton, menuState])

    const handleMenuClose = useCallback(() => {
        setMenuState('closed')
    }, [])

    const _menuButton = !menuButton ? null : React.cloneElement(menuButton, {
        onMouseDown: handleMenuButtonClick,
        ref: menuButtonRef
    })

    useEffect(() => {
        if (menuState === 'open') {
            if (props.onOpen) {
                props.onOpen()
            }

            if (menuRef.current) {
                const input = menuRef.current.querySelector('input')
                if (input) {
                    setTimeout(() => {
                        input.focus()
                    }, 100)
                }
            }
        }
    }, [menuState])

    useEffect(() => {
        if (props.buttonRef) {
            props.buttonRef.current = menuButtonRef.current
        }
        if (menuButtonRef.current) {
            menuButtonRef.current.addEventListener('close', handleMenuClose)

            return () => {
                if (menuButtonRef.current) {
                    menuButtonRef.current.removeEventListener('close', handleMenuClose)
                }
            }
        }
    }, [menuButtonRef])

    useEffect(() => {
        if (props.open === true) {
            setMenuState('open')
        } else if (props.open === false) {
            setMenuState('closed')
        }
    }, [props.open])

    return (
        <>
            {_menuButton}
            <ControlledMenu 
                ref={menuRef}
                menuButton={menuButton}
                state={props.menuState || menuState}
                anchorRef={menuButtonRef}
                onClose={handleMenuClose}
                className={classNames('menu', {
                    [props.className]: !!props.className,
                    'full-width': !!fullWidth
                })}
                {...props}
            >
                {children}
            </ControlledMenu>
        </>
    )
}

_Menu.Button = MenuButton
_Menu.Item = MenuItem

export default _Menu