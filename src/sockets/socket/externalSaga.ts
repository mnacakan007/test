import { all, fork, put } from 'redux-saga/effects';
import { setConnectionStatus as reduxSocketActions } from '~/store/socket/slice';
import actions from './actions';
import { SetConnectionStatusType } from '~/store/socket/types';

function* updateConnectionStatus(action: {
  type   : any;
  payload: SetConnectionStatusType;
}) {
	switch (action.type) {
		case actions.SOCKET_CONNECTION_STATUS_SET: {
			yield put(reduxSocketActions(action.payload));
			break;
		}

		default:
			break;
	}
}

export default function* socketSaga(action: {
  type   : any;
  payload: SetConnectionStatusType;
}) {
	yield all([fork(updateConnectionStatus, action)]);
}
