import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

const logger = createLogger({ collapsed: true })

const middlewares = [thunk, logger]

export default createStore(rootReducer, applyMiddleware(...middlewares))
