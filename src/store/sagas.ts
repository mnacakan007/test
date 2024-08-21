import { all } from 'redux-saga/effects';
import newsListSaga from '~/store/news/saga.ts';
import settingsSaga from '~/store/settings/saga';
// import externalSocketSagas from '../sockets/sagas';

export default function* sagas(): Generator {
	yield all([
		settingsSaga(),
		newsListSaga(),
		// socketSaga(),
		// externalSocketSagas(),
	]);
}
