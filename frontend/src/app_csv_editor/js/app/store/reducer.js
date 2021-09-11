import * as TYPES from './types'

export const initialState = {
    loading: false,
    data: {
        pagination: {
            page: 1
        },
        data: {
            keys: [],
            values: []
        }
    }
}

export const reducer = (state = initialState, action) => {
    if (!action?.type) {
        return state
    }
    switch (action.type) {
        case TYPES.ACTION_SET_LOADING:
            return {
                ...state,
                loading: action.payload !== undefined ? action.payload : !state.loading
            }

        case TYPES.ACTION_SET_DATA:
            return {
                ...state,
                data: action.payload
            }

        case TYPES.IMPORT_FILE_REQUEST:
        case TYPES.FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TYPES.IMPORT_FILE_SUCCESS:
        case TYPES.FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }

        case TYPES.IMPORT_FILE_ERROR:
        case TYPES.FETCH_DATA_ERROR:
            return {
                ...state,
                loading: false
            }

        case TYPES.CHANGE_PAGE:
            return {
                ...state,
                data: {
                    ...state.data,
                    pagination: {
                        ...state.data.pagination,
                        page: action.payload
                    }
                }
            }

        default:
            return state
    }
}