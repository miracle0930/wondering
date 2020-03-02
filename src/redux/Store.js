import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';

export default function configuteStore(initialState={}) {
  const isDebugMode = !(process.env.NODE_ENV && process.env.NODE_ENV === 'production');
  const reducer = combineReducers({ ...reducers });
  let finalCreateStore = applyMiddleware(thunkMiddleware)(createStore);
  if (isDebugMode) {
    finalCreateStore = composeWithDevTools(applyMiddleware(thunkMiddleware))(createStore);
  }
  return finalCreateStore(reducer, initialState);
}


