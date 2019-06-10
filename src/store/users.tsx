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
    error: action.payload,
  }),
  resendEmail: (state, action) => ({
    ...state,
    loading: true,
  }),
  resendEmailSuccess: (state, action) => ({
    ...state,
    loading: false,
  }),
  resendEmailFailure: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  confirmEmail: (state, action) => ({
    ...state,
    loading: true,
  }),
  confirmEmailSuccess: (state, action) => ({
    ...state,
    loading: false,
  }),
  confirmEmailFailure: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  sendPasswordRecoveryEmail: (state, action) => ({
    ...state,
    loading: true,
  }),
  sendPasswordRecoveryEmailSuccess: (state, action) => ({
    ...state,
    loading: false,
  }),
  sendPasswordRecoveryEmailFailure: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  recoverPassword: (state, action) => ({
    ...state,
    loading: true,
  }),
  recoverPasswordSuccess: (state, action) => ({
    ...state,
    loading: false,
  }),
  recoverPasswordFailure: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  changePassword: (state, action) => ({
    ...state,
    loading: true,
  }),
  changePasswordSuccess: (state, action) => ({
    ...state,
    loading: false,
  }),
  changePasswordFailure: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
};

const sagas: ISagas = {
  *register({ payload }) {
    try {
      const { user } = yield http.post('/users/register', payload)
        .then(res => res.data);

      yield put(reduxModule.actions.registerSuccess(user));
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao registrar usuário');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.registerFailure(errorInfo));
    }
  },
  *registerSuccess() {
    history.replace('/login');
    yield notification.open({
      icon: <Icon type="mail" style={{ color: '#108ee9' }} />,
      message: 'Email de Confirmação',
      description: `Enviamos um email de confirmação para você.
      Por favor verifique sua caixa de entrada para continuar.`,
      duration: null,
    });
  },
  *resendEmail({ payload }) {
    try {
      yield http.post('/users/register/resend', payload);

      yield put(reduxModule.actions.resendEmailSuccess());
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao reenviar email');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.resendEmailFailure(errorInfo));
    }
  },
  *resendEmailSuccess() {
    history.replace('/login');
    yield notification.open({
      icon: <Icon type="mail" style={{ color: '#108ee9' }} />,
      message: 'Email de Confirmação',
      description: `Enviamos um email de confirmação para você.
      Por favor verifique sua caixa de entrada para continuar.`,
      duration: null,
    });
  },
  *confirmEmail({ payload: token }) {
    try {
      yield http.post(`/users/register/${token}`);
      yield put(reduxModule.actions.confirmEmailSuccess());
      history.replace('/login');
      message.success('Email confirmado com sucesso');
    } catch (err) {
      const errorInfo = normalizeError(
        err,
        'Falha ao confirmar email. Tente novamente mais tarde.',
      );
      message.error(errorInfo.message);
      yield put(reduxModule.actions.confirmEmailFailure(errorInfo));
      history.replace('/login');
    }
  },
  *sendPasswordRecoveryEmail({ payload }) {
    try {
      yield http.post('/users/password-recovery', payload);
      yield put(reduxModule.actions.sendPasswordRecoveryEmailSuccess());
      message.success('Email enviado');
    } catch (err) {
      const errorInfo = normalizeError(err, 'Failha ao enviar email');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.sendPasswordRecoveryEmailFailure(errorInfo));
    }
  },
  *recoverPassword({ payload }) {
    try {
      const { token } = payload;
      yield http.post(`/users/password-recovery/${token}`, payload);
      yield put(reduxModule.actions.recoverPasswordSuccess());
      message.success('Senha recuperada com sucesso');
      history.replace('/login');
    } catch (err) {
      const errorInfo = normalizeError(err, 'Failha ao recuperar senha');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.recoverPasswordFailure(errorInfo));
    }
  },
  *changePassword({ payload }) {
    try {
      yield http.post('/users/change-password', payload);
      yield put(reduxModule.actions.changePasswordSuccess());
      message.success('Senha alterada com sucesso');
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao alterar senha');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.changePasswordFailure(errorInfo));
    }
  },
};

const reduxModule = createReduxModule<IState>('users', initialState, reducer, sagas);

export default reduxModule;
