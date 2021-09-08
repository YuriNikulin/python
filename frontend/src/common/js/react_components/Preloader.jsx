import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import preloaderIcon from '../../icons/preloader.svg'
import classNames from 'classnames'

const animDuration = 300

const Preloader = ({ ...props }) => {
    const [state, setState] = useState({
        show: props.in,
        entering: false,
        leaving: false
    })

    useEffect(() => {
            setState({
                show: true,
                entering: props.in,
                leaving: !props.in
            })

            setTimeout(() => {
                setState({
                    show: props.in,
                    entering: props.in,
                    leaving: false
                })
            }, animDuration)
    }, [props.in])
    return (
        state.show && 
            <div className={classNames("preloader-wrapper", {
                "in": state.entering,
                "leaving": state.leaving
            })}>
                <div className="preloader">
                    <div dangerouslySetInnerHTML={{__html: preloaderIcon}} />
                </div>
            </div>
    )
}

Preloader.propTypes = {
    in: PropTypes.bool
}

export default Preloader