import { put } from 'redux-saga/effects';
import { message } from 'antd';

import createReduxModule from './createReduxModule';
import history from '../routes/history';
import http, { setToken, removeToken } from '../utils/http';
import { normalizeError } from '../utils/error';
import { persistor } from './';

interface IState {
  logged: boolean;
  token: string;
  user: IUser;
  loading: boolean;
  error: {
    message: string,
    status?: string | number,
    isTimeout?: boolean,
  };
}

const initialState: IState = {
  logged: false,
  token: '',
  user: {
    id: '',
    name: '',
    email: '',
  },
  loading: false,
  error: { message: '' },
};

const reducer: IReducer<IState> = {
  login: (state, action) => ({
    ...state,
    loading: true,
  }),
  loginSuccess: (state, action) => ({
    ...state,
    token: action.payload.token,
    user: action.payload.user,
    loading: false,
    logged: true,
  }),
  loginFailure: (state, action) => ({
    ...state,
    loading: false,
  }),
  logout: (state, action) => ({
    ...state,
    loading: true,
  }),
  logoutSuccess: (state, action) => ({
    ...state,
    loading: false,
    logged: false,
  }),
  logoutFailure: (state, action) => ({
    ...state,
    loading: true,
  }),
};

const sagas: ISagas = {
  *login ({ payload }) {
    try {
      const { token, user } = yield http.post('/auth/login', payload)
        .then(res => res.data);

      setToken(token);
      yield put(reduxModule.actions.loginSuccess({ token, user }));
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao autenticar usuário');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.loginFailure(errorInfo));
    }
  },
  *logout ({ payload }) {
    try {
      removeToken();
      localStorage.removeItem('persist:root');
      history.push('/login');
      yield put(reduxModule.actions.logoutSuccess());
      yield http.post('/auth/logout', payload);
      yield persistor.purge();
    } catch (err) {
      console.error(err);
    }
  },
};

const reduxModule = createReduxModule<IState>('auth', initialState, reducer, sagas);

export default reduxModule;
