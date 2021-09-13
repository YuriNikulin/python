import * as TYPES from './types'
import makeRequest from 'common/request'
import { sleep } from '../../../../common/js/utils'
import { getState } from '..'
import showNotification from '../../../../common/js/notification'

const getColumnsFromStore = (columns) => {
    return Object.entries(columns).reduce((acc, [key, value]) => {
        if (!value) {
            return acc
        }

        return [...acc, key]
    }, [])
}

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
        body.filters = !options.resetFilter ? state.data.filters : []

        if (Object.keys(state.data.columns).length) {
            body.columns = getColumnsFromStore(state.data.columns)
        }

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

export const editCell = (payload) => async (state, dispatch) => {
    dispatch({
        type: TYPES.EDIT_CELL_REQUEST
    })

    try {
        await makeRequest('/api/csv_editor/edit', {
            method: 'POST',
            body: payload,
            showErrorNotification: true
        })
        dispatch({
            type: TYPES.EDIT_CELL_SUCCESS,
            payload
        })
        showNotification({
            title: 'Редактирование записи',
            text: 'Редактирование успешно выполнено.',
            duration: 1500
        })
    } catch(e) {
        dispatch({
            type: TYPES.EDIT_CELL_ERROR
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

export const removeItem = (id) => async(state, dispatch) => {
    dispatch({
        type: TYPES.REMOVE_ITEM_REQUEST
    })
    try {
        await makeRequest(`/api/csv_editor/remove/${id}`, {
            method: 'DELETE',
            showErrorNotification: true
        })
        dispatch({
            type: TYPES.REMOVE_ITEM_SUCCESS,
            payload: id
        })
        showNotification({
            title: 'Удаление записи',
            text: 'Удаление успешно выполнено.',
            duration: 1500
        })
        dispatch(fetchData({})(state, dispatch))
    } catch(e) {
        dispatch({
            type: TYPES.REMOVE_ITEM_ERROR
        })
    }
    
}

export const addItem = (id) => async(state, dispatch) => {
    dispatch({
        type: TYPES.ADD_ITEM_REQUEST
    })
    try {
        const newItemId = await makeRequest(`/api/csv_editor/add/${id}`, {
            method: 'PUT',
            showErrorNotification: true
        })
        dispatch({
            type: TYPES.ADD_ITEM_SUCCESS,
            payload: newItemId
        })
        showNotification({
            title: 'Создание записи',
            text: 'Создание успешно выполнено.',
            duration: 1500
        })
        dispatch(fetchData({})(state, dispatch))
        
        await sleep(5000)

        dispatch({
            type: TYPES.RESET_HIGHLIGHTED_ITEM,
            payload: newItemId
        })
    } catch(e) {
        console.error(e)
        dispatch({
            type: TYPES.ADD_ITEM_ERROR
        })
    }
}

export const addColumn = (value) => async(state, dispatch) => {
    dispatch({
        type: TYPES.ADD_COLUMN_REQUEST
    })
    try {
        await makeRequest(`/api/csv_editor/addColumn`, {
            method: 'POST',
            body: {
                column: value
            },
            showErrorNotification: true
        })
        dispatch({
            type: TYPES.ADD_COLUMN_SUCCESS,
        })
        showNotification({
            title: 'Добавление столбца',
            text: `Добавление столбца ${value} успешно выполнено.`,
            duration: 1500
        })
        dispatch(fetchData({})(state, dispatch))
    
    } catch(e) {
        console.error(e)
        dispatch({
            type: TYPES.ADD_COLUMN_ERROR
        })
    }
}

export const createDocument = () => async(state, dispatch) => {
    dispatch({
        type: TYPES.CREATE_DOCUMENT_REQUEST
    })
    try {
        await makeRequest(`/api/csv_editor/createDocument`, {
            method: 'CREATE',
            showErrorNotification: true
        })
        dispatch({
            type: TYPES.CREATE_DOCUMENT_SUCCESS,
        })
        dispatch(fetchData({ resetFilter: true })(state, dispatch))
    
    } catch(e) {
        console.error(e)
        dispatch({
            type: TYPES.CREATE_DOCUMENT_ERROR
        })
    }
}

export const changeShownColumns = (values) => async(state, dispatch) => {
    dispatch({
        type: TYPES.CHANGE_SHOWN_COLUMNS,
        payload: values
    })

    await sleep(100)
    dispatch(fetchData({})(state, dispatch))
}

export const exportDocument = (type) => async (state, dispatch) => {
    dispatch({
        type: TYPES.EXPORT_DOCUMENT_REQUEST,
    })

    try {
        const state = getState()
        const body = {}
        body.sort = state.data.sort
        body.filters = state.data.filters
        if (Object.keys(state.data.columns).length) {
            body.columns = getColumnsFromStore(state.data.columns)
        }

        const res = await makeRequest(`/api/csv_editor/export?format=${type}`, {
            method: 'POST',
            body,
            showErrorNotification: true,
            returnRawResponse: true
        })
        let filename = res.headers.get('Content-Disposition').match(/filename=\\?"(.*)\\?"/)[1]
        
        const blob = await res.blob()
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement("a");
        document.body.appendChild(link);
        
        link.href = blobUrl;
        link.download = filename;
        link.dispatchEvent(
            new MouseEvent('click', { 
              bubbles: true, 
              cancelable: true, 
              view: window 
            })
          );
        document.body.removeChild(link);

    } catch(e) {
        console.log(e)
    }

}