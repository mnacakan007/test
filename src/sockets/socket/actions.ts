const actions = {
	SOCKET_CONNECTION_STATUS_SET: 'SOCKET_CONNECTION_STATUS_SET',

	setConnectionStatus: (status: any) => ({
		type   : actions.SOCKET_CONNECTION_STATUS_SET,
		payload: {
			status,
		},
	}),
};

export default actions;
