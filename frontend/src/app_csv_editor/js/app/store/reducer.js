import * as TYPES from './types'

export const initialState = {
    loading: false
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
        default:
            return state
    }
}