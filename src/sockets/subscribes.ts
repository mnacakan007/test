import { END, NotUndefined } from '@redux-saga/types';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';
import { SocketStatus } from '~/helpers/commonConstants';
import { EventType } from '~/helpers/sockets/types';
import { settingsUpdate } from '~/sockets/settings/actions';
import { SettingsRefreshActionType } from '~/store/settings/types';

import socketActions from './socket/actions';

function subscribe(
	socket: Socket<DefaultEventsMap, DefaultEventsMap>,
	emit: {
    (input: NotUndefined | END): void;
    (arg0: SettingsRefreshActionType): void;
  }
) {
	// Standard Events ------------------------------------------------------------------------------

	socket.on('connect', (): void => {
		logs('Websocket connection established');
		emit(socketActions.setConnectionStatus(SocketStatus.CONNECTED));
	});

	socket.on('disconnect', (reason): void => {
		logs('Websocket disconnected. Trying reconnect...');
		logs('Websocket disconnected reason ' + reason);
		if (reason === 'io server disconnect') {
			socket.connect();
		}
	});

	socket.on('reconnect', (): void => {
		logs('Websocket reconnect...');
	});

	socket.on('error', (error): void => {
		logs('Connection to websocket failed with error ' + error);
		emit(socketActions.setConnectionStatus(SocketStatus.DISCONNECTED));
	});

	socket.on('connect_error', (err): void => {
		logs('Socket connection error... ' + err);
		emit(socketActions.setConnectionStatus(SocketStatus.DISCONNECTED));
	});

	// Custom Events --------------------------------------------------------------------------------

	socket.on(EventType.SETTINGS_CHANGED_BRANCH, (event) =>
		emit(settingsUpdate(event))
	);

	socket.on(EventType.SETTINGS_CHANGED_GLOBAL, (event) =>
		emit(settingsUpdate(event))
	);
}

function logs(message: string, isError = false): void {
	/*if (!showLogs) {
        return;
    }*/

	if (isError) {
		console.error(message);

		return;
	}

	console.log(message);
}

export default subscribe;
