import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { ApolloProvider } from 'react-apollo'

import Localization from '@components/LayoutComponents/Localization'
import apolloClient from '@core/api/apollo'
import Router from '@router'
import sagas from '@redux/sagas'
import reducers from '@redux/reducers'
import * as serviceWorker from './serviceWorker'

// app styles
import './global.scss'
import './costom.scss'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [thunk, sagaMiddleware, routeMiddleware]
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}
const store = createStore(reducers(history), compose(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <Localization>
        <Router history={history} />
      </Localization>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.register()
export { store, history }
