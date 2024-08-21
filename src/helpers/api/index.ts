import axios from 'axios';
import { API_URL } from '~/shared/config/config.js';
import { handleError } from '~/store/middleware';

import { getRawToken } from '../utility';

const instance = axios.create({
	baseURL: API_URL,
});

export const apiRequest = async (req: any) => {
	const url = API_URL + req.url;
	const token = getRawToken();

	if (!req.headers) {
		req.headers = {};
	}

	if (token) {
		req.headers.Authorization = `Bearer ${token}`;
	}

	req.headers['X-Requested-With'] = 'XMLHttpRequest';

	if (!req.params) {
		req.params = {};
	}

	if (!req.data) {
		req.data = {};
	}

	const config = {
		method          : req.method,
		url,
		headers         : req.headers,
		params          : req.params,
		data            : req.data,
		onUploadProgress: req.onUploadProgress,
	};

	return instance(config)
		.then(function (response) {
			return response;
		})
		.catch(function (error) {
			if (!error.response) {
				throw Error('something_went_wrong');
			}

			if (!(error && error.response)) {
				return;
			}

			handleError(error);

			if (error.response && error.response.data) {
				const { text } = error.response.data;

				throw Error(text);
			}
		});
};
