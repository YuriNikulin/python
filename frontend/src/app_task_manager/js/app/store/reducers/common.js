import * as TYPES from '../types'
import { LOCATION_CHANGE } from 'connected-react-router'
import { SORTINGS } from '../../constants'

const initialState = {
    loading: false,
    data: {
        data: [],
        pagination: {}
    },
    filters: {},
    sort: {
        key: SORTINGS[0].key,
        value: 'desc' 
    },
    details: {},
    profile: null,
    shouldScrollTop: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.FETCH_TASKS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TYPES.FETCH_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                shouldScrollTop: false
            }

        case TYPES.FETCH_TASKS_ERROR:
            return {
                ...state,
                loading: false
            }

        case TYPES.CHANGE_FILTER:
            return {
                ...state,
                shouldScrollTop: true,
                data: {
                    ...state.data,
                    pagination: {
                        ...state.data.pagination,
                        page: 1
                    }
                },
                filters: {
                    ...state.filters,
                    [action.payload.key]: {
                        value: action.payload.value,
                        strict: action.payload.strict
                    }
                }
            }

        case TYPES.RESET_FILTER:
            return {
                ...state,
                filters: Object.entries(state.filters).reduce((acc, [key, value]) => {
                    return {
                        ...acc,
                        [key]: {
                            value: ''
                        }
                    }
                }, {})
            }

        case TYPES.FETCH_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TYPES.FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                details: action.payload
            }

        case TYPES.FETCH_DETAILS_ERROR:
            return {
                ...state,
                loading: false
            }

        case TYPES.PATCH_DETAILS_SUCCESS:
            return {
                ...state,
                details: action.payload
            }

        case TYPES.LOG_TIME_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TYPES.LOG_TIME_SUCCESS:
            return {
                ...state,
                loading: false,
                details: action.payload
            }

        case TYPES.LOG_TIME_ERROR:
            return {
                ...state,
                loading: false
            }

        case LOCATION_CHANGE:
            return {
                ...state,
                details: initialState.details
            }

        case TYPES.CREATE_TASK_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TYPES.CREATE_TASK_ERROR:
            return {
                ...state,
                loading: false
            }

        case TYPES.DELETE_TASK_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TYPES.DELETE_TASK_ERROR:
            return {
                ...state,
                loading: false
            }

        case TYPES.FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload
            }

        case TYPES.PATCH_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload
            }

        case TYPES.CHANGE_PAGINATION:
            return {
                ...state,
                shouldScrollTop: true,
                data: {
                    ...state.data,
                    pagination: {
                        ...state.data.pagination,
                        page: action.payload
                    }
                }
            }

        case TYPES.CHANGE_SORT:
            return {
                ...state,
                sort: {
                    key: action.payload,
                    value: state.sort.key === action.payload && state.sort.value === 'desc' ? 'asc' : 'desc'
                }
            }
            
        default:
            return state
    }
}

export default reducer