import * as TYPES from '../types'

export const fetchTasks = (payload) => {
    return {
        type: TYPES.FETCH_TASKS_REQUEST
    }
}

export const fetchTasksSuccess = (payload) => {
    return {
        type: TYPES.FETCH_TASKS_SUCCESS,
        payload
    }
}

export const fetchTasksError = () => {
    return {
        type: TYPES.FETCH_TASKS_ERROR,
    }
}

export const changeFilter = (payload) => {
    return {
        type: TYPES.CHANGE_FILTER,
        payload
    }
}

export const resetFilter = () => {
    return {
        type: TYPES.RESET_FILTER
    }
}