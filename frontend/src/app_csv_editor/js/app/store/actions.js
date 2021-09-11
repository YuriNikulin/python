import * as TYPES from './types'
import makeRequest from 'common/request'
import { sleep } from '../../../../common/js/utils'
import { getState } from '..'

export const setLoading = (payload) => () => {
    return {
        type: TYPES.ACTION_SET_LOADING,
        payload
    }
}

export const fetchData = (payload) => async (_, dispatch) => {
    const state = getState()
    const options = {
        resetPagination: false,
        resetFilters: false,
        ...payload.options
    }

    dispatch({
        type: TYPES.FETCH_DATA_REQUEST
    })

    try {
        const body = {}
        body.page = !options.resetPagination ? state.data.pagination.page : 1
        body.sort = state.data.sort
        body.filters = state.data.filters

        const res = await makeRequest('/api/csv_editor/getData', {
            method: 'POST',
            body,
            showErrorNotification: true
        })

        dispatch({
            type: TYPES.FETCH_DATA_SUCCESS,
            payload: res
        })
    } catch(e) {
        dispatch({
            type: TYPES.FETCH_DATA_ERROR
        })
    }
}

export const importFile = (file) => async (state, dispatch) => {
    dispatch({
        type: TYPES.IMPORT_FILE_REQUEST
    })
    const formData = new FormData()
    formData.append('file', file)
    try {
        const res = await makeRequest('/api/csv_editor/import', {
            method: 'POST',
            body: formData,
            useStringifyBody: false,
            showErrorNotification: true
        })

        dispatch({
            type: TYPES.IMPORT_FILE_SUCCESS,
            payload: res
        })
    } catch(e) {
        dispatch({
            type: TYPES.IMPORT_FILE_ERROR,
        })
    }
}

export const changePage = (page) => async (state, dispatch) => {
    dispatch({
        type: TYPES.CHANGE_PAGE,
        payload: page
    })

    await sleep(5)
    dispatch(fetchData({})(state, dispatch))
}

export const changeSort = (value) => async (state, dispatch) => {
    dispatch({
        type: TYPES.CHANGE_SORT,
        payload: value
    })

    await sleep(5)
    dispatch(fetchData({})(state, dispatch))
}

export const changeFilter = (value) => async (state, dispatch) => {
    dispatch({
        type: TYPES.CHANGE_FILTER,
        payload: value
    })

    await sleep(5)
    dispatch(fetchData({
        options: {
            resetPagination: true
        }
    })(state, dispatch))
}

export const resetFilter = () => async (state, dispatch) => {
    dispatch({
        type: TYPES.RESET_FILTER,
    })

    await sleep(5)
    dispatch(fetchData({
        options: {
            resetPagination: true
        }
    })(state, dispatch))
}