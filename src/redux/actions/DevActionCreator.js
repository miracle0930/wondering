
import ReduxConstants from '../ReduxConstants';

const fakeNetworkRequest = (req, delay = 3000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = `the ${req} has been completed`;
      resolve(res);
    }, delay)
  })
}

export const simpleActionCreator = (res) => {
  return {
    type: ReduxConstants.DEV.SAVE_NETWORK_RES,
    res
  }
}

export const middlewaredActionCreator = (req) => {
  return async (dispatch, getState) => {
    const res = await fakeNetworkRequest(req);
    dispatch(simpleActionCreator(res));
  }
}
