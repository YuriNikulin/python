import React, { useContext, createContext, useState, useEffect, useReducer } from 'react';
import { Provider } from 'react-redux'
import { store, history } from './store'
import Homepage from './pages/Homepage/Homepage'
import Details from './pages/Details/Details'
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import Profile from './components/Profile';

const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/task/create" component={Details} />
                    <Route path="/task/:id" component={Details} />
                    <Route path="/" component={Homepage} />
                </Switch>
                <Profile />
            </ConnectedRouter>
        </Provider>
    )
}

export default App;
