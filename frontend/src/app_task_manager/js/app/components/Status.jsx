import React from 'react'
import { ENUMS } from '../constants'
import Tag from './Tag'

const Status = ({ value }) => {
    return <Tag color={ENUMS.STATUSES[value]?.color} label={ENUMS.STATUSES[value]?.name || value} />
}

export default Status
