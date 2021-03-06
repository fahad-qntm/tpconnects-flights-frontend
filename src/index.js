import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import './App.scss'
import App from './App'
import reducers from './State/Reducers'
import 'react-virtualized-select/node_modules/react-select/dist/react-select.css'
import 'react-virtualized-select/styles.css'
import 'react-datetime/css/react-datetime.css'
let store = createStore(reducers, applyMiddleware(thunk, promiseMiddleware()))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
