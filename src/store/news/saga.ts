import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { newsAPI } from '~/helpers/api/news.ts';
import { AxiosApiResponse } from '~/service/types.ts';
import {
	authorsListRefresh,
	categoryNewsRefresh,
	newsRefresh,
	uiRefresh,
	videoNewsListRefresh,
} from '~/store/news/slice.ts';
import {
	IAuthor,
	ICategoryNewsParams,
	IInitialData,
	INews,
	INewsGetStore,
	INewsPagination,
} from '~/store/news/types.ts';
import { RootState } from '~/store/store.ts';
import { ISagaActionType } from '~/store/types.ts';
import newsActions from './actions';

export const messages = {
	errorLoad: 'Loading settings failed',
};

const getStoreData = ({ settings, news }: RootState): INewsGetStore => {
	const { currentWebsite, currentCategoryId } = settings;
	const { pagination } = news;
	return {
		currentWebsite,
		currentCategoryId,
		pagination,
	};
};

function* newsInitialReloadSaga() {
	yield takeLatest(newsActions.GET_INITIAL_NEWS, function* () {
		yield put(uiRefresh({ loading: true }));

		const { currentWebsite }: INewsGetStore = yield select(getStoreData);

		try {
			const response: AxiosApiResponse<IInitialData> = yield call(newsAPI.getNews, currentWebsite);

			if (response && response.status === 200) {
				const data = response.data;
				yield put(newsRefresh(data as unknown as IInitialData));
				yield put(uiRefresh({ loading: false }));
			}
		} catch (error) {
			yield put(uiRefresh({ loading: false }));
			console.log(error);
		}
	});
}

function* categoriesNewsReloadSaga() {
	yield takeLatest(newsActions.GET_CATEGORY_NEWS, function* (action: ISagaActionType<{ categoryId: string }>){
		yield put(uiRefresh({ loading: true }));
		
		const { categoryId } = action.data;
		const { pagination: { page, limit } }: INewsGetStore = yield select(getStoreData);
		
		const params: ICategoryNewsParams = {
			categoryId,
			page,
			limit,
		};

		try {
			const response: AxiosApiResponse<INews[] | IAuthor[]> = yield call(newsAPI.getCategoryNews, params);

			if (response && response.status === 200) {
				const data = response.data;

				// Todo: Fix me after connect backend
				if (categoryId === '9') {
					yield put(categoryNewsRefresh(null));
					yield put(authorsListRefresh(data as unknown as IAuthor[]));
				} else {
					yield put(authorsListRefresh(null));
					yield put(categoryNewsRefresh(data as unknown as INews[]));
				}

				yield put(uiRefresh({ loading: false }));
			}
		} catch (error) {
			yield put(uiRefresh({ loading: false }));
			console.log(error);
		}
	});
}

function* videoNewsReloadSaga() {
	yield takeLatest(newsActions.GET_VIDEO_NEWS, function* (){
		yield put(uiRefresh({ loading: true }));

		const { pagination: { page, limit } }: INewsGetStore = yield select(getStoreData);

		const params: INewsPagination = {
			page,
			limit,
		};

		try {
			const response: AxiosApiResponse<INews[]> = yield call(newsAPI.getVideoNews, params);

			if (response && response.status === 200) {
				const data = response.data;
				yield put(videoNewsListRefresh(data as unknown as INews[]));
				yield put(uiRefresh({ loading: false }));
			}
		} catch (error) {
			yield put(uiRefresh({ loading: false }));
			console.log(error);
		}
	});
}

export default function* newsListSaga() {
	yield all([
		fork(newsInitialReloadSaga),
		fork(categoriesNewsReloadSaga),
		fork(videoNewsReloadSaga),
	]);
}
