const newsActions = {
	GET_INITIAL_NEWS : 'GET_INITIAL_NEWS',
	GET_CATEGORY_NEWS: 'GET_CATEGORY_NEWS',
	GET_VIDEO_NEWS   : 'GET_VIDEO_NEWS',
	GET_AUTHORS      : 'GET_AUTHORS',
	GET_CATEGORIES   : 'GET_CATEGORIES',

	getInitialNewsAction: () => {
		return {
			type: newsActions.GET_INITIAL_NEWS,
		};
	},
	getCategoryNewsAction: (categoryId: string) => {
		return {
			type: newsActions.GET_CATEGORY_NEWS,
			data: {
				categoryId,
			},
		};
	},
	getVideoNewsAction: () => {
		return {
			type: newsActions.GET_VIDEO_NEWS,
		};
	},
	getAuthorsAction: () => {
		return {
			type: newsActions.GET_AUTHORS,
		};
	},
	getCategoriesAction: () => {
		return {
			type: newsActions.GET_CATEGORIES,
		};
	},
};

export default newsActions;
