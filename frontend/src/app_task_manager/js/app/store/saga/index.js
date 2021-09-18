import { all, fork } from 'redux-saga/effects'
import details from './details'

export default function* rootSaga() {
    yield all([fork(details)])
}