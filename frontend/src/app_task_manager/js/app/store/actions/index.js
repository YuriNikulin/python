import * as TYPES from '../types'

export const fetchTasks = (payload) => {
    return {
        type: TYPES.FETCH_TASKS_REQUEST
    }
}