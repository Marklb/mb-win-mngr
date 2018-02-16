import { createStore, applyMiddleware, compose, StoreEnhancer, Store } from 'redux'
// import { persistState } from 'redux-devtools'
import thunk from 'redux-thunk'
import * as promiseMiddleware from 'redux-promise'
import { createLogger } from 'redux-logger'
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer,
} from 'electron-redux'
import getRootReducer from '../reducers'
import { Inject } from '../../common/injector'
import { composeWithDevTools } from 'remote-redux-devtools'

/**
 * @param  {Object} initialState
 * @param  {String} [scope='main|renderer']
 * @return {Object} store
 */
export default function configureStore(initialState, scope = 'main') {
  const logger = createLogger({
    level: scope === 'main' ? undefined : 'info',
    collapsed: true,
  })
  // const router = routerMiddleware(hashHistory)

  let middleware = [
    thunk,
    promiseMiddleware,
  ]

  if (!process.env.NODE_ENV) {
    // middleware.push(logger)
  }

  if (scope === 'renderer') {
    middleware = [
      forwardToMain,
      // router,
      ...middleware,
    ]
  }

  if (scope === 'main') {
    middleware = [
      triggerAlias,
      ...middleware,
      forwardToRenderer,
    ]
  }

  const enhanced = [
    applyMiddleware(...middleware),
  ]

  if (/*! process.env.NODE_ENV && */scope === 'renderer') {
    // enhanced.push(DevTools.instrument())
    // enhanced.push(persistState(
    //   window.location.href.match(
    //     /[?&]debug_session=([^&]+)\b/
    //   )
    // ))
  }

  const rootReducer = getRootReducer(scope)
  const enhancer: StoreEnhancer<any> = compose(...enhanced)
  // const enhancer: StoreEnhancer<any> = composeWithDevTools(...enhanced)
  const store = createStore(rootReducer, initialState, enhancer)

  // if (!process.env.NODE_ENV && module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     store.replaceReducer(require('../reducers'))
  //   })
  // }

  if (scope === 'main') {
    replayActionMain(store)
  } else {
    replayActionRenderer(store)
  }

  return store
}

@Inject
export class StoreContainer {

  public store: Store<any>

  constructor() {}

}
