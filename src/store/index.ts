import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { combineReducers, createStore, compose, applyMiddleware, Reducer } from 'redux';
import { persistStore, persistReducer, PersistConfig, Persistor } from 'redux-persist';
import { all } from 'redux-saga/effects';

import auth from './auth';
import users from './users';
import polls from './polls';
import workshops from './workshops';
import { handleToken } from './middlewares';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}

// Reducers
const rootReducer = combineReducers({
  auth: auth.reducer,
  users: users.reducer,
  polls: polls.reducer,
  workshops: workshops.reducer,
});

const persistConfig: PersistConfig = {
  storage,
  key: 'root',
  whitelist: ['auth'],
};

const persistedReducer: Reducer = persistReducer(persistConfig, rootReducer);

// Sagas
export function* rootSaga() {
  yield all([
    auth.runSagas(),
    users.runSagas(),
    polls.runSagas(),
    workshops.runSagas(),
  ]);
}

const initialState = {};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, handleToken));

const store = createStore(persistedReducer, initialState, enhancer);

sagaMiddleware.run(rootSaga);

export const persistor: Persistor = persistStore(store);
export default store;
