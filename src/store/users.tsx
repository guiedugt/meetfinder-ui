import { put } from 'redux-saga/effects';
import { message, notification, Icon } from 'antd';

import createReduxModule from './createReduxModule';

import history from '../routes/history';
import { normalizeError } from '../utils/error';
import React from 'react';
import http from '../utils/http';

interface IState {
  loading: boolean;
  error: {
    message: string,
    status?: string | number,
    isTimeout?: boolean,
  };
}

const initialState: IState = {
  loading: false,
  error: { message: '' },
};

const reducer: IReducer<IState> = {
  register: (state, action) => ({
    ...state,
    loading: true,
  }),
  registerSuccess: (state, action) => ({
    ...state,
    loading: false,
  }),
  registerFailure: (state, action) => ({
    ...state,
    loading: false,
  }),
};

const sagas: ISagas = {
  *register ({ payload }) {
    try {
      const res = yield http.post('/users/register', payload)
        .then(res => res.data);

      yield put(reduxModule.actions.registerSuccess(res.user));
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao registrar usuário');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.registerFailure(errorInfo));
    }
  },
  *registerSuccess({ payload }) {
    history.replace('/login');
    notification.open({
      icon: <Icon type="mail" style={{ color: '#108ee9' }} />,
      message: 'Email de Confirmação',
      description: `Enviamos um email de confirmação para você.
      Por favor verifique sua caixa de entrada para continuar.`,
      duration: null,
    });
  },
  *registerFailure ({ payload }) {
    yield console.log('registerFailure sagas:', payload);
  },
};

const reduxModule = createReduxModule<IState>('users', initialState, reducer, sagas);

export default reduxModule;
