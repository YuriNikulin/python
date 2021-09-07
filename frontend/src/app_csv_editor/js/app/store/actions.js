import * as TYPES from './types'

export const setLoading = (payload) => (state) => {
    return {
        type: TYPES.ACTION_SET_LOADING,
        payload
    }
}