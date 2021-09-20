import React, { useCallback, useEffect, useRef, useState } from 'react'
import Menu from './Menu';
import Select from './Select';
import Preloader from './Preloader';
import makeRequest from 'common/request'
import debounce from 'lodash-es/debounce'

const MenuApi = (props) => {
    const inputRef = useRef()
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const isFirstOnChange = useRef(true) 

    const fetchData = useCallback(async (search = '') => {
        setLoading(true)
        try {
            const res = await makeRequest(props.url, {
                queryParams: {
                    search
                }
            })
            setOptions(res)
        } finally {
            setLoading(false)
        }
    }, [])

    const handleOpen = useCallback(() => {
        if (!options.length) {
            fetchData()
        }
    }, [options])

    const debouncedFetchData = useCallback(debounce(fetchData, 500), [fetchData])

    const handleInputChange = useCallback((value) => {
        setInputValue(value)

        debouncedFetchData(value)
    }, [])

    return (
        <Select
            onInputChange={handleInputChange}
            inputValue={inputValue}
            onOpen={handleOpen}
            {...props}
        >
            <Preloader in={loading} />
            {!!options.length ? 
                options.map((opt) => {
                    return (
                        <Menu.Item key={opt.id} value={opt}>
                            {opt.name}
                        </Menu.Item>
                    )
                }) : (
                    <div className="px-3">
                        {!loading && 'Ничего не найдено'}
                    </div>
                )
            }
        </Select>
    )
}

export default MenuApi