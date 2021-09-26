import classNames from 'classnames'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CloseIcon } from 'common/react_components/Icon'
import Popup from 'reactjs-popup'

const modalOverlayClass = 'modal-overlay'

const Modal = ({ closable = true, closeOnEsc = true, ...props }) => {
    const [isOpen, setIsOpen] = useState(!!props.isOpen)
    const [isTrulyOpen, setIsTrulyOpen] = useState(isOpen)
    const bodyRef = useRef()
    const footerRef = useRef()

    const handleClose = useCallback(() => {
        if (props.onClose) {
            props.onClose()
        } else {
            setIsOpen(false)
        }
    }, [props.onClose])

    const handleWindowClick = (e) => {
        if (!closable) {
            return
        }

        if (e.target.classList.contains(modalOverlayClass)) {
            handleClose()
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            if (closeOnEsc && closable) {
                handleClose()
            }
        } else if (e.key === 'Enter') {
            if (footerRef.current) {
                const submitButton = footerRef.current.querySelector('[data-trigger-enter]')
                if (submitButton) {
                    submitButton.click()
                }
            }
        }
    }

    useEffect(() => {
        setIsOpen(props.isOpen)
    }, [props.isOpen])

    useEffect(() => {
        if (isOpen) {
            setIsTrulyOpen(true)
            window.addEventListener('click', handleWindowClick)
            window.addEventListener('keydown', handleKeyDown)
            setTimeout(() => {
                if (bodyRef.current) {
                    const input = bodyRef.current.querySelector('input, textarea')
                    if (input) {
                        input.focus()
                    }
                }
            }, 300)
            return () => {
                window.removeEventListener('click', handleWindowClick)
                window.removeEventListener('keydown', handleKeyDown)
            }
        } else {
            setTimeout(() => {
                setIsTrulyOpen(false)
            }, 500)
        }
    }, [isOpen])

    return (
        <Popup
            className={classNames("modal", {
                "open": isOpen
            })}
            open={isTrulyOpen}
            onClose={handleClose}
            contentStyle={{
                width: props.width || 768
            }}
            closeOnDocumentClick={false}
            closeOnEscape={false}
        >
            {(closable || props.title) && (
                <div className="modal-header">
                    {props.title && (
                        <h5 className="modal-title">
                            {props.title}
                        </h5>
                    )}
                    {closable && (
                        <button className="reset-button text-hover-danger" onClick={handleClose}>
                            <CloseIcon />
                        </button>
                    )}
                </div>
            )}
            <div className="modal-body" ref={bodyRef}>
                {props.children}
            </div>
            {props.footer && (
                <div className="modal-footer" ref={footerRef}>
                    {props.footer}
                </div>
            )}
        </Popup>
    )

}

export default Modal