import React from 'react'
import { ENUMS } from '../constants'
import Tag from './Tag'

const Priority = ({ value }) => {
    return <Tag color={ENUMS.PRIORITIES[value]?.color} label={ENUMS.PRIORITIES[value]?.name || value} />
}

export default Priority
