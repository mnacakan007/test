import { combineReducers } from 'redux';
import socketReducer from '~/store/socket/slice';
import settingsReducer from '~/store/settings/slice';
import newsReducer from '~/store/news/slice';

const reducers = {
	socket  : socketReducer,
	settings: settingsReducer,
	news    : newsReducer,
};

const combinedReducers = combineReducers(reducers);

export default combinedReducers;
