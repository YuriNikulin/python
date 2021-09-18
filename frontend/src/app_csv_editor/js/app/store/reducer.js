import * as TYPES from './types'

export const initialState = {
    loading: false,
    shouldScrollTop: false,
    highlightedItems: {},
    data: {
        pagination: {
            page: 1
        },
        data: {
            keys: [],
            values: []
        },
        sort: {},
        filters: [],
        columns: {}
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
            return {
                ...state,
                loading: true,
                shouldScrollTop: true
            }
            
        case TYPES.FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case TYPES.IMPORT_FILE_SUCCESS:
        case TYPES.FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                shouldScrollTop: false,
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
                shouldScrollTop: true,
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
                shouldScrollTop: true,
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

        case TYPES.EDIT_CELL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TYPES.EDIT_CELL_SUCCESS:
            let row, rowIndex
            for (let i = 0; i < state.data.data.values.length; i++) {
                if (state.data.data.values[i][0] === action.payload.id) {
                    row = state.data.data.values[i]
                    rowIndex = i
                    break
                }
            }
            if (!row) {
                return {
                    ...state,
                    loading: false
                }
            }
 
            row[action.payload.columnIndex] = action.payload.value
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    data: {
                        ...state.data.data,
                        values: [
                            ...state.data.data.values.slice(0, rowIndex),
                            row,
                            ...state.data.data.values.slice(rowIndex + 1)
                        ]
                    }
                }
            }
        case TYPES.EDIT_CELL_ERROR:
            return {
                ...state,
                loading: false
            }

        case TYPES.REMOVE_ITEM_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TYPES.REMOVE_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case TYPES.REMOVE_ITEM_ERROR:
            return {
                ...state,
                loading: false
            }

        case TYPES.ADD_ITEM_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TYPES.ADD_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                highlightedItems: {
                    ...state.highlightedItems,
                    [action.payload]: true
                }
            }

        case TYPES.ADD_ITEM_ERROR:
            return {
                ...state,
                loading: false
            }

        case TYPES.RESET_HIGHLIGHTED_ITEM:
            return {
                ...state,
                highlightedItems: {
                    [action.payload]: undefined
                }
            }

        case TYPES.ADD_COLUMN_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TYPES.ADD_COLUMN_SUCCESS:
        case TYPES.ADD_COLUMN_ERROR:
            return {
                ...state,
                loading: false
            }

        case TYPES.CREATE_DOCUMENT_REQUEST:
            return {
                ...state,
                loading: true,
                shouldScrollTop: true
            }

        case TYPES.CREATE_DOCUMENT_SUCCESS:
        case TYPES.CREATE_DOCUMENT_ERROR:
            return {
                ...state,
                loading: false,
                shouldScrollTop: false
            }

        case TYPES.CHANGE_SHOWN_COLUMNS:
            return {
                ...state,
                data: {
                    ...state.data,
                    columns: action.payload
                }
            }

        case TYPES.EXPORT_DOCUMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TYPES.EXPORT_DOCUMENT_SUCCESS:
        case TYPES.EXPORT_DOCUMENT_ERROR:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}