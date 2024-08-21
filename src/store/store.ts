import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import combinedReducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();


const store = configureStore({
	reducer   : combinedReducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const selectStore = () => {
	return store.getState();
};
export default store;
