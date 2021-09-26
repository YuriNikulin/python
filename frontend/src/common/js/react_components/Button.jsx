import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Button = ({ type="primary", className, ...props }) => {
    return (
        <button className={cn("btn", {
            [`btn-${type}`]: !props.outline,
            [`btn-outline-${type}`]: !!props.outline,
            'btn-sm': props.small,
            'btn-lg': props.large,
            [className]: !!className
        })} {...props}>
            {props.children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.any.isRequired
}

export default Button