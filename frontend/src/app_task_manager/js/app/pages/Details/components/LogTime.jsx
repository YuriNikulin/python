import React, { useCallback, useState } from 'react'
import Modal from 'common/react_components/Modal'
import Button from 'common/react_components/Button'

const LogTime = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('')

    const toggleModal = useCallback((value) => {
        setIsOpen(value !== undefined ? value : !isOpen)
    }, [isOpen])

    const handleInputChange = useCallback((e) => {
        const _value = e.target.value
        setValue(_value)
    }, [value])

    const handleSave = useCallback(() => {
        props.onChange(value)
        toggleModal(false)
        setTimeout(() => {
            setValue('')
        }, 500)
    }, [value])

    return (
        <>
            <Button onClick={toggleModal}>
                Залогировать время
            </Button>
            <Modal
                isOpen={isOpen}
                title="Залогировать время"
                onClose={() => toggleModal(false)}
                width={500}
                footer={
                    <div>
                        <Button onClick={handleSave} data-trigger-enter>
                            Сохранить
                        </Button>
                        <Button outline className="ms-3" onClick={() => toggleModal(false)}>
                            Отменить
                        </Button>
                    </div>
                }
            >
                <div>
                    <input
                        className="form-control"
                        placeholder="Потраченное время (в часах)"
                        onChange={handleInputChange}
                        value={value}
                    />
                </div>
            </Modal>
        </>
    )
}

export default LogTime