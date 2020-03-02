import ReduxConstants from '../ReduxConstants';

export default function DevReducer(state={}, action={}) {
  switch (action.type) {
    case ReduxConstants.DEV.CHECK_DATA:
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return {}
  }
}