import * as TYPES from '../types'

const initialState = {
    loading: false,
    data: {
        data: [],
        pagination: {}
    },
    filters: {},
    sort: {}
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
                data: action.payload
            }

        case TYPES.FETCH_TASKS_ERROR:
            return {
                ...state,
                loading: false
            }

        case TYPES.CHANGE_FILTER:
            return {
                ...state,
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
            
        default:
            return state
    }
}

export default reducer