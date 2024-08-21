const actions = {
	GET_SCRIPTS         : 'GET_SCRIPTS',
	GET_LANGUAGE        : 'GET_LANGUAGE',
	APP_LANGUAGE_REFRESH: 'APP_LANGUAGE_REFRESH',
	GET_INITIAL_SETTINGS: 'GET_INITIAL_SETTINGS',

	getScriptsAction: () => {
		return {
			type: actions.GET_SCRIPTS,
		};
	},

	getInitialSettingsAction: (data: any) => {
		return {
			type: actions.GET_INITIAL_SETTINGS,
			data,
		};
	},
};

export default actions;
