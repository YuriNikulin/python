import React from 'react'
import Tag from './Tag'

const TagsReadonly = (props) => {
    if (!props.value) {
        return null
    }

    return props.value.map((v) => {
        return (
            <Tag key={v.id} label={v.name} />
        )
    })
}

export default TagsReadonly