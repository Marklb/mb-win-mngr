import { combineReducers } from 'redux'
// import { routerReducer as routing } from 'react-router-redux'
// import { reducer as form } from 'redux-form'
// import system from './system'
// import job from './job'
// import project from './project'
// import github from './github'
import settings from './settings'
import virtualDesktop from '../../../extensions/virtual-desktop/shared/redux/reducers/virtual-desktop'
import windowSettings from '../../../extensions/window-settings/shared/redux/reducers/window-settings'

export const _reducers = {
  virtualDesktop,
  windowSettings
}

export default function getRootReducer(scope = 'main') {
  let reducers = {
    // system,
    // job,
    // project,
    // github,
    settings,
    ..._reducers
  };

  if (scope === 'renderer') {
    reducers = {
      ...reducers,
      // routing,
      // form,
    };
  }

  return combineReducers({ ...reducers })
}
