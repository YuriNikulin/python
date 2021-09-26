import React, { useCallback, useState, useMemo } from 'react'
import Select from '../../../../common/js/react_components/Select'
import Menu from '../../../../common/js/react_components/Menu'
import { ENUMS } from '../constants'

const Enum = (props) => {
    const [inputValue, setInputValue] = useState('')

    const handleInputChat = useCallback((value) => {
        setInputValue(value)
    }, [])

    const options = useMemo(() => {
        return Object.values(ENUMS[props.type]).filter(v => v.name.toLowerCase().includes(inputValue)).map(v => v)
    }, [props.type, inputValue])

    const _value = useMemo(() => {
        if (props.multi || !props.value) {
            return props.value
        }
        const valueFromOptions = options.find(v => v.id === (props.value.id || props.value))
        return valueFromOptions
    }, [props.value, options, props.multi])

    return (
        <Select {...props} value={_value} inputValue={inputValue} onInputChange={handleInputChat}>
            {!!options.length ? options.map((opt) => {
                return (
                    <Menu.Item value={opt} key={opt.id}>
                        {opt.name}
                    </Menu.Item>
                )
            }) : <p className="px-3 text-secondary text-center">Ничего не найдено</p>}
        </Select>
    )
}

export default Enum