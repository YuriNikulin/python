import * as TYPES from './types'
import makeRequest from 'common/request'

export const setLoading = (payload) => () => {
    return {
        type: TYPES.ACTION_SET_LOADING,
        payload
    }
}

export const importFile = (file) => async (state, dispatch) => {
    dispatch(setLoading(true)())
    const formData = new FormData()
    formData.append('file', file)
    try {
        const res = await makeRequest('/api/csv_editor/import', {
            method: 'POST',
            body: formData,
            useStringifyBody: false,
            showErrorNotification: true
        })
    } catch(e) {

    } finally {
        dispatch(setLoading(false)())
    }
}