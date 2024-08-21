import { all, fork, takeEvery } from 'redux-saga/effects';

import { emitEvent } from '~/helpers/sockets/socket';
import { reconnect } from '~/store/socket/slice';

function* reconnectSaga() {
  yield takeEvery(reconnect.type, function* (action) {
    const { authToken } = action.payload;
    yield emitEvent('change-token', { token: authToken });
  });
}

export default function* socketSaga() {
  yield all([fork(reconnectSaga)]);
}
