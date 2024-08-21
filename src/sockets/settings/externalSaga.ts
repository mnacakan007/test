import { all, call, fork, put } from 'redux-saga/effects';
import { setSettingsUpdatedValue } from '~/store/settings/slice';
import { SETTINGS_UPDATE } from '~/store/settings/types';

function* settingsUpdateSaga(action: { type: any }) {
	switch (action.type) {
		case SETTINGS_UPDATE: {
			yield call(settingsUpdated);
			break;
		}
		default:
			break;
	}
}

function* settingsUpdated() {
	yield put(setSettingsUpdatedValue(true));
}

export default function* settingsSocketSaga(action: { type: any }) {
	yield all([fork(settingsUpdateSaga, action)]);
}
