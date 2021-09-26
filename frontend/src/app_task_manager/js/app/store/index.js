import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory({
    basename: '/app/task_manager'
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    rootReducer(history),
    applyMiddleware(sagaMiddleware, routerMiddleware(history))
)

sagaMiddleware.run(rootSaga)