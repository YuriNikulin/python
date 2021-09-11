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
        },
        sort: {},
        filters: []
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
                data: {
                    ...state.data,
                    ...action.payload
                }
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

        case TYPES.CHANGE_SORT:
            return {
                ...state,
                data: {
                    ...state.data,
                    sort: action.payload
                }
            }

        case TYPES.CHANGE_FILTER:
            let newFilters
            if (!action.payload.value) {
                newFilters = state.data.filters.filter(f => f.key !== action.payload.key)
            } else {
                const existingFilterIndex = state.data.filters.findIndex(f => f.key === action.payload.key)

                if (existingFilterIndex !== -1) {
                    newFilters = [
                        ...state.data.filters.slice(0, existingFilterIndex),
                        action.payload,
                        ...state.data.filters.slice(existingFilterIndex + 1)
                    ]
                } else {
                    newFilters = [...state.data.filters, action.payload]
                }
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    filters: newFilters
                }
            }

        case TYPES.RESET_FILTER:
            return {
                ...state,
                data: {
                    ...state.data,
                    filters: initialState.data.filters
                }
            }

        default:
            return state
    }
}