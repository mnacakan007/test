import { RootState } from '~/store/store.ts';

export const newsSelector = {
	initialData : (state: RootState) => state.news.initialData,
	categoryNews: (state: RootState) => state.news.categoryNews,
	videoNews   : (state: RootState) => state.news.videoNewsList,
	authors     : (state: RootState) => state.news.authors,
	author      : (state: RootState) => state.news.author,
	UI          : (state: RootState) => state.news.UI,
	pagination  : (state: RootState) => state.news.pagination,
};
