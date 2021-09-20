import { all, fork, takeLatest, put, select, debounce } from 'redux-saga/effects'
import makeRequest from 'common/request'
import * as TYPES from '../types'
import { fetchTasks, fetchTasksError, fetchTasksSuccess } from '../actions'
import { filtersSelector } from '../selectors'

function* fetchTasksSaga() {
    const filters = yield select(filtersSelector)
    const body = {}

    if (Object.keys(filters).length) {
        body.filters = Object.entries(filters).reduce((acc, [key, filterObject]) => {
            const { value, strict } = filterObject
            if (value) {
                let _value = value.id || value
                if (Array.isArray(_value)) {
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
    
    try {
        const res = yield makeRequest('/api/task_manager/task', {
            method: 'POST',
            body
        })
        yield put(fetchTasksSuccess(res))
    } catch(e) {
        yield put(fetchTasksError())
    }
}

function* changeFilterSaga({ payload }) {
    yield put(fetchTasks())
}

function* sagas() {
    yield takeLatest(
        TYPES.FETCH_TASKS_REQUEST,
        fetchTasksSaga
    )
    yield debounce(500, TYPES.CHANGE_FILTER, changeFilterSaga)
    yield takeLatest(TYPES.RESET_FILTER, changeFilterSaga)
}



export default function* rootSaga() {
    yield all([fork(sagas)])
}