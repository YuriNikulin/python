import { combineReducers } from 'redux'
import common from './common'
import { connectRouter } from 'connected-react-router'

export default (history) => {
    return combineReducers({
        common,
        router: connectRouter(history)
    })
}
