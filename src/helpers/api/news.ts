import { ICategoryNewsParams, INewsPagination } from '~/store/news/types.ts';
import { apiRequest } from './index.ts';

function getNews(website: string, params = {}) {
	const req = {
		method: 'GET',
		url   : `/${website}`,
		params,
	};

	return apiRequest(req);
}

function getCategoryNews({ categoryId, page, limit }: ICategoryNewsParams ) {
	const req = {
		method: 'GET',
		url   : `/${categoryId}?_page=${page}&_limit=${limit}`,
	};

	return apiRequest(req);
}


function getVideoNews({ page, limit }: INewsPagination) {
	const req = {
		method: 'GET',
		url   : `/videoNewsList?_page=${page}&_limit=${limit}`,
	};

	return apiRequest(req);
}

function getCategories(website: string, params = {}) {
	const req = {
		method: 'GET',
		url   : `/${website}`,
		params,
	};

	return apiRequest(req);
}

export const newsAPI = {
	getNews,
	getCategoryNews,
	getVideoNews,
	getCategories,
};

