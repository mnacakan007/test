import { useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers.ts';
import sagas from './sagas.ts';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer   : reducers,
	middleware: [sagaMiddleware],
});

sagaMiddleware.run(sagas);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
