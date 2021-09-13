import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Button = ({ type="primary", className, ...props }) => {
    return (
        <button className={cn("btn", {
            [`btn-${type}`]: true,
            'btn-sm': props.small,
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