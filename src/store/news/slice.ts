import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	IAuthor,
	IInitialData,
	INews,
	INewsPagination,
	INewsUI,
	NewsStateInitial,
} from './types';

export const newsInitialState: NewsStateInitial = {
	initialData  : null,
	categories   : null,
	categoryNews : null,
	videoNewsList: null,
	authors      : null,
	author       : null,
	UI           : {
		loading            : false,
		showNewsFeed       : false,
		selectedVideoNewsId: null,
		showSubscribeModal : false,
		showVideoModal     : false,
		autoPlayVideo      : false,
	},
	pagination: {
		page   : 1,
		limit  : 15,
		hasMore: true,
	},
};

const newsSlice = createSlice({
	name        : 'news',
	initialState: newsInitialState,
	reducers    : {
		newsRefresh: (
			state: NewsStateInitial,
			{ payload }: PayloadAction<IInitialData>
		) => {
			state.initialData = payload;
		},
		categoryNewsRefresh: (
			state: NewsStateInitial,
			{ payload }: PayloadAction<INews[] | null>
		) => {
			state.categoryNews = payload;
		},
		videoNewsListRefresh: (
			state: NewsStateInitial,
			{ payload }: PayloadAction<INews[]>
		) => {
			state.videoNewsList = payload;
		},
		authorsListRefresh: (
			state: NewsStateInitial,
			{ payload }: PayloadAction<IAuthor[] | null>
		) => {
			state.authors = payload;
		},
		authorRefresh: (
			state: NewsStateInitial,
			{ payload }: PayloadAction<IAuthor | null>
		) => {
			state.author = payload;
		},
		uiRefresh: (
			state: NewsStateInitial,
			{ payload }: PayloadAction<INewsUI>
		) => {
			const source = payload;
			const target = state.UI;
			state.UI = { ...target, ...source };
		},
		paginationRefresh: (
			state: NewsStateInitial,
			{ payload }: PayloadAction<INewsPagination>
		) => {
			const source = payload;
			const target = state.pagination;
			state.pagination = { ...target, ...source };
		},
	},
});
export const {
	newsRefresh,
	categoryNewsRefresh,
	videoNewsListRefresh,
	authorsListRefresh,
	authorRefresh,
	uiRefresh,
	paginationRefresh,
} = newsSlice.actions;
export default newsSlice.reducer;
