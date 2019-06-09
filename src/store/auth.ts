import { put } from 'redux-saga/effects';

import createReduxModule from './createReduxModule';
import http from '../utils/http';
import history from '../routes/history';
import { normalizeError } from '../utils/error';

interface IState {
  logged: boolean;
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
  user: {
    email: '',
    token: '',
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
    user: action.payload,
    loading: false,
    logged: true,
  }),
  loginFailure: (state, action) => ({
    ...state,
    loading: false,
  }),
};

const sagas: ISagas = {
  *login ({ payload }) {
    try {
      const user = yield http.post('/auth/login', payload)
        .then(res => res.data);

      yield put(reduxModule.actions.loginSuccess(user));
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao autenticar usuário');
      yield put(reduxModule.actions.loginFailure(errorInfo));
    }
  },
  *loginSuccess ({ payload }) {
    yield console.log('loginSuccess sagas:', payload);
  },
  *loginFailure ({ payload }) {
    yield console.log('loginFailure sagas:', payload);
  },
};

const reduxModule = createReduxModule<IState>('auth', initialState, reducer, sagas);

export default reduxModule;
