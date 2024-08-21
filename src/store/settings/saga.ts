// import { all, call, fork, takeLatest } from 'redux-saga/effects';
// import { settingsAPI } from '~/helpers/api/settings';
// import {  settingsReload } from './slice';

// export const messages = {
// 	errorLoad: 'Loading settings failed',
// };
//
// function* settingsReloadSaga() {
// 	yield takeLatest(settingsReload.type, function* () {
// 		try {
// 			const response = yield call(settingsAPI.me);
//
// 			if (response && response.status === 200) {
// 				yield put(settingsRefresh({ data: [] }));
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	});
// }

export default function* partnersListSaga() {
	// yield all([fork(settingsReloadSaga)]);
}
