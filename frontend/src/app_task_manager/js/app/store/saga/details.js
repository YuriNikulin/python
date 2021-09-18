import {
    takeLatest,
    takeEvery,
    put,
    delay,
    select,
    take,
} from 'redux-saga/effects'

// function* getEntitiesListSagaResolver({ payload }: GetEntityRequest) {
//     if (payload.table === 'groupedByPatientsPatients') {
//         yield put(getSamples(payload))
//     } else {
//         yield put(getTasks(payload))
//     }
// }

export default function* entitiesListSaga() {
    // yield takeEvery(
    //     TYPES.GET_ENTITIES_LIST_REQUEST,
    //     getEntitiesListSagaResolver
    // )
}