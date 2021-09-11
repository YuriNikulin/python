import React from 'react'

const Icon = (props) => {
    return (
        <span className="icon" style={{width: props.size, height: props.size}}>
            {props.children}
        </span>
    )
}

export const ChevronDownIcon = () => (
    <Icon>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path d="M6 9L12 15 18 9"></path>
        </svg>
    </Icon>
)

export const ChevronUpIcon = () => (
    <Icon>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="feather feather-chevron-up"
            viewBox="0 0 24 24"
        >
            <path d="M18 15L12 9 6 15"></path>
        </svg>
    </Icon>
)

export const FilterIcon = (props) => (
    <Icon {...props}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="feather feather-filter"
            viewBox="0 0 24 24"
        >
            <path d="M22 3L2 3 10 12.46 10 19 14 21 14 12.46 22 3z"></path>
        </svg>
    </Icon>
)