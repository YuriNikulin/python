import React from 'react'
import classNames from 'classnames'

const Tag = (props) => {
    return (
        <span className={classNames('badge badge-pill', {
            [`bg-${props.color || 'info'}`]: true,
            'text-dark': ['warning', 'info', 'light'].includes(props.color)
        })}>
            {props.label}
        </span>
    )
}

export default Tag