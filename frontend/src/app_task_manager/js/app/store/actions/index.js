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

export const fetchDetails = (taskId) => {
    return {
        type: TYPES.FETCH_DETAILS_REQUEST,
        payload: taskId
    }
}

export const fetchDetailsSuccess = (payload) => {
    return {
        type: TYPES.FETCH_DETAILS_SUCCESS,
        payload
    }
}

export const fetchDetailsError = () => {
    return {
        type: TYPES.FETCH_DETAILS_ERROR
    }
}

export const patchDetails = (payload) => {
    return {
        type: TYPES.PATCH_DETAILS_REQUEST,
        payload: payload
    }
}

export const patchDetailsSuccess = (payload) => {
    return {
        type: TYPES.PATCH_DETAILS_SUCCESS,
        payload
    }
}

export const patchDetailsError = () => {
    return {
        type: TYPES.PATCH_DETAILS_ERROR
    }
}

export const logTimeRequest = (payload) => {
    return {
        type: TYPES.LOG_TIME_REQUEST,
        payload
    }
}

export const logTimeSuccess = (payload) => {
    return {
        type: TYPES.LOG_TIME_SUCCESS,
        payload
    }
}

export const logTimeError = () => {
    return {
        type: TYPES.LOG_TIME_ERROR
    }
}

export const createTaskRequest = (payload) => {
    return {
        type: TYPES.CREATE_TASK_REQUEST,
        payload
    }
}

export const createTaskSuccess = () => {
    return {
        type: TYPES.CREATE_TASK_SUCCESS,
    }
}

export const createTaskError = () => {
    return {
        type: TYPES.CREATE_TASK_ERROR,
    }
}

export const deleteTaskRequest = (payload) => {
    return {
        type: TYPES.DELETE_TASK_REQUEST,
        payload
    }
}

export const deleteTaskSuccess = () => {
    return {
        type: TYPES.DELETE_TASK_SUCCESS,
    }
}

export const deleteTaskError = () => {
    return {
        type: TYPES.DELETE_TASK_ERROR,
    }
}

export const fetchProfile = () => {
    return {
        type: TYPES.FETCH_PROFILE_REQUEST,
    }
}

export const fetchProfileSuccess = (payload) => {
    return {
        type: TYPES.FETCH_PROFILE_SUCCESS,
        payload
    }
}

export const patchProfileRequest = (payload) => {
    return {
        type: TYPES.PATCH_PROFILE_REQUEST,
        payload
    }
}

export const patchProfileSuccess = (payload) => {
    return {
        type: TYPES.PATCH_PROFILE_SUCCESS,
        payload
    }
}

export const changePagination = (payload) => {
    return {
        type: TYPES.CHANGE_PAGINATION,
        payload
    }
}

export const changeSort = (payload) => {
    return {
        type: TYPES.CHANGE_SORT,
        payload
    }
}