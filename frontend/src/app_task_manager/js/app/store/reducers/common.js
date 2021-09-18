import * as TYPES from '../types'

const initialState = {
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.FETCH_TASKS_REQUEST:
            return {
                ...state,
                loading: true
            }
            
        default:
            return state
    }
}

export default reducer