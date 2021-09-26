import React, { useMemo } from 'react'
import * as dayjs from 'dayjs'

const Date = (props) => {
    const displayValue = useMemo(() => {
        try {
            return dayjs(props.value).format('DD.MM.YYYY, hh:mm')
        } catch(e) {
            console.log(e)
            return ''
        }
    }, [props.value])

    return displayValue 
}

export default Date