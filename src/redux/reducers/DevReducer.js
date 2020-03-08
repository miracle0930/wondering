import ReduxConstants from '../ReduxConstants';

const initialState = {
  testRes: 'initial res'
}

export default function DevReducer(state=initialState, action={}) {
  switch (action.type) {
    case ReduxConstants.DEV.CHECK_DATA:
      return Object.assign({}, state, {
        data: action.data
      });
    case ReduxConstants.DEV.SAVE_NETWORK_RES: {
      return Object.assign({}, state, {
        testRes: action.res
      });
    }
    default:
      return state
  }
}