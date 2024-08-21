import { apiRequest } from './index.ts';
/* ------------------------------------------------------------------------------------------------
    Main
------------------------------------------------------------------------------------------------ */

// get me
function me(params = {}) {
	const req = {
		method: 'GET',
		url   : '/me',
		params,
	};

	return apiRequest(req);
}

export const settingsAPI = {
	me,
};
