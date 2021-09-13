import React from 'react'

const Icon = (props) => {
    return (
        <span className="icon" style={{ width: props.size, height: props.size }}>
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

export const EditIcon = (props) => (
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
            className="feather feather-edit-2"
            viewBox="0 0 24 24"
        >
            <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
    </Icon>
)

export const TrashIcon = (props) => (
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
            className="feather feather-trash"
            viewBox="0 0 24 24"
        >
            <path d="M3 6L5 6 21 6"></path>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
        </svg>
    </Icon>
)

export const AddIcon = (props) => (
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
            className="feather feather-plus-square"
            viewBox="0 0 24 24"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            <path d="M12 8L12 16"></path>
            <path d="M8 12L16 12"></path>
        </svg>
    </Icon>
)

export const CloseIcon = (props) => (
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
            className="feather feather-x"
            viewBox="0 0 24 24"
        >
            <path d="M18 6L6 18"></path>
            <path d="M6 6L18 18"></path>
        </svg>
    </Icon>
)

