import { all, fork, takeLatest, put, select, debounce } from 'redux-saga/effects'
import makeRequest from 'common/request'
import showNotification from 'common/notification'
import * as TYPES from '../types'
import { createTaskError, fetchDetailsError, fetchDetailsSuccess, fetchProfileSuccess, fetchTasks, fetchTasksError, fetchTasksSuccess, logTimeError, logTimeSuccess, patchDetailsError, patchDetailsSuccess, patchProfileSuccess } from '../actions'
import { dataSelector, detailsSelector, filtersSelector, sortSelector } from '../selectors'
import { getMyId } from '../../../../../common/js/utils'
import { transformDetailsForBackend  } from '../../utils'
import { push } from 'connected-react-router'

function* fetchTasksSaga() {
    const filters = yield select(filtersSelector)
    const { pagination } = yield select(dataSelector)
    const sort = yield select(sortSelector)
    const body = {}

    body.sort = sort

    if (Object.keys(filters).length) {
        body.filters = Object.entries(filters).reduce((acc, [key, filterObject]) => {
            const { value, strict } = filterObject
            if (value) {
                let _value = value.id || value
                if (key === 'onlyMyTasks') {
                    return [
                        ...acc,
                        {
                            key: 'assignee',
                            value: getMyId(),
                            strict: true
                        }
                    ]
                }
                if (Array.isArray(_value)) {
                    if (!_value.length) {
                        return acc
                    }
                    _value = _value.map(v => v.id)
                }
                return [
                    ...acc,
                    {
                        key,
                        strict,
                        value: _value,
                    }
                ]
            }
            return acc
        }, [])
    }

    body.page = pagination.page
    
    try {
        const res = yield makeRequest('/api/task_manager/task', {
            method: 'POST',
            showErrorNotification: true,
            body,
        })
        yield put(fetchTasksSuccess(res))
    } catch(e) {
        yield put(fetchTasksError())
    }
}

function* changeFilterSaga({ payload }) {
    yield put(fetchTasks())
}

function* fetchDetailsSaga({ payload }) {
    try {
        const res = yield makeRequest(`/api/task_manager/task/${payload}`, {
            method: "GET",
            showErrorNotification: true
        })

        yield put(fetchDetailsSuccess(res))
    } catch(e) {
        yield put(fetchDetailsError())
    }
}

function* patchDetailsSaga({ payload }) {
    try {
        const { id } = yield select(detailsSelector)
        const res = yield makeRequest(`/api/task_manager/task/${id}`, {
            method: "PATCH",
            showErrorNotification: true,
            body: transformDetailsForBackend(payload)
        })

        yield put(patchDetailsSuccess(res))
        showNotification({
            title: 'Редактирование таска',
            text: 'Редактирование таска успешно выполнено',
            duration: 2000
        })
    } catch(e) {
        yield put(patchDetailsError())
    }
}

function* logTimeSaga({ payload }) {
    try {
        const { id } = yield select(detailsSelector)
        const res = yield makeRequest(`/api/task_manager/task/${id}/log`, {
            method: "POST",
            showErrorNotification: true,
            body: {
                value: payload
            }
        })

        yield put(logTimeSuccess(res))
        showNotification({
            title: 'Логирование времени',
            text: 'Логирование времени успешно выполнено',
            duration: 2000
        })
    } catch(e) {
        yield put(logTimeError())
    }
}

function* createTaskSaga({ payload }) {
    try {
        const res = yield makeRequest('/api/task_manager/task/create', {
            method: 'POST',
            body: transformDetailsForBackend(payload),
            showErrorNotification: true,
        })
        yield put(push(`/task/${res.id}`))
        showNotification({
            title: 'Создание таска',
            text: 'Создание таска успешно выполнено'
        })
    } catch(e) {
        yield put(createTaskError())
    }
}

function* deleteTaskSaga({ payload }) {
    try {
        yield makeRequest(`/api/task_manager/task/${payload}`, {
            method: 'DELETE',
            showErrorNotification: true,
            returnRawResponse: true
        })
        yield put(push(`/task`))
        showNotification({
            title: 'Удаление таска',
            text: 'Удаление таска успешно выполнено'
        })
    } catch(e) {
        yield put(createTaskError())
    }
}

function* fetchProfileSaga() {
    try {
        const res = yield makeRequest('/api/profile', {
            method: 'GET'
        })

        yield put(fetchProfileSuccess(res))
    } catch(e) {
        console.error(e)
    }
}


function* patchProfileSaga({ payload }) {
    try {
        const res = yield makeRequest('/api/task_manager/user', {
            method: 'PATCH',
            body: payload,
            showErrorNotification: true,
        })

        yield put(patchProfileSuccess(res))
        showNotification({
            title: 'Изменение имени пользователя',
            text: 'Изменение имени пользователя успешно выполнено'
        })
    } catch(e) {
        console.error(e)
    }
}

function* changePaginationSaga() {
    yield put(fetchTasks())
}

function* changeSortSaga() {
    yield put(fetchTasks())
}


function* sagas() {
    yield takeLatest(
        TYPES.FETCH_TASKS_REQUEST,
        fetchTasksSaga
    )
    yield debounce(500, TYPES.CHANGE_FILTER, changeFilterSaga)
    yield takeLatest(TYPES.RESET_FILTER, changeFilterSaga)
    yield takeLatest(TYPES.FETCH_DETAILS_REQUEST, fetchDetailsSaga)
    yield takeLatest(TYPES.PATCH_DETAILS_REQUEST, patchDetailsSaga)
    yield takeLatest(TYPES.LOG_TIME_REQUEST, logTimeSaga)
    yield takeLatest(TYPES.CREATE_TASK_REQUEST, createTaskSaga)
    yield takeLatest(TYPES.DELETE_TASK_REQUEST, deleteTaskSaga)
    yield takeLatest(TYPES.FETCH_PROFILE_REQUEST, fetchProfileSaga)
    yield takeLatest(TYPES.PATCH_PROFILE_REQUEST, patchProfileSaga)
    yield takeLatest(TYPES.CHANGE_PAGINATION, changePaginationSaga)
    yield takeLatest(TYPES.CHANGE_SORT, changeSortSaga)
}

export default function* rootSaga() {
    yield all([fork(sagas)])
}