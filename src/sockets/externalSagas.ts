// import { all, call, fork, takeEvery } from 'redux-saga/effects';
// import { watchMessages } from './watcher';
// import socketSaga from './socket/externalSaga';
// import settingsSocketSaga from "~/sockets/settings/externalSaga";
//
// export default function* externalSagas() {
//   const channel = yield call(watchMessages);
//
//   yield takeEvery(channel, function* (action) {
//     yield all([fork(socketSaga, action), fork(settingsSocketSaga, action)]);
//   });
// }
