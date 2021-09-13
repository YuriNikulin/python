import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    Menu,
    MenuItem,
    MenuButton,
    MenuDivider,
    MenuHeader,
    SubMenu,
    ControlledMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

const _Menu = ({menuButton, children, ...props}) => {
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

    const _menuButton = React.cloneElement(menuButton, {
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
        if (menuButtonRef.current) {
            menuButtonRef.current.addEventListener('close', handleMenuClose)

            return () => {
                if (menuButtonRef.current) {
                    menuButtonRef.current.removeEventListener('close', handleMenuClose)
                }
            }
        }
    }, [menuButtonRef])

    return (
        <>
            {_menuButton}
            <ControlledMenu 
                ref={menuRef}
                menuButton={menuButton}
                state={menuState}
                anchorRef={menuButtonRef}
                onClose={handleMenuClose}
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