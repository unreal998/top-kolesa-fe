import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { AppSate, rootReducer } from './reducers';
import { rootSaga } from './sagas';

export const sagaMiddleware = createSagaMiddleware();

export const setupStore = (preloadedState?: PreloadedState<AppSate>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: [sagaMiddleware],
  });
};

export const store = setupStore();

sagaMiddleware.run(rootSaga);
