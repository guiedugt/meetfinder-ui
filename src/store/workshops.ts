import { put, select } from 'redux-saga/effects';
import { message } from 'antd';

import createReduxModule from './createReduxModule';
import { normalizeError } from '../utils/error';
import http from '../utils/http';
import pollModule from './polls';

interface IState {
  item?: IWorkshop;
  items: IWorkshop[];
  loading: boolean;
  error: {
    message: string,
    status?: string | number,
    isTimeout?: boolean,
  };
}

const initialState: IState = {
  item: undefined,
  items: [],
  loading: false,
  error: { message: '' },
};

const reducer: IReducer<IState> = {
  createWorkshop: (state, action) => ({
    ...state,
    loading: true,
  }),
  createWorkshopSuccess: (state, action) => ({
    ...state,
    loading: false,
  }),
  createWorkshopFailure: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
};

const sagas: ISagas = {
  *createWorkshop({ payload }) {
    try {
      yield http.post('/workshops', payload);

      message.success('Workshop agendado com sucesso');
      yield put(reduxModule.actions.createWorkshopSuccess());
      yield put(pollModule.actions.fetchMyPolls());
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao agendar workshop');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.createWorkshopFailure(errorInfo));
    }
  },
};

const reduxModule = createReduxModule<IState>('workshops', initialState, reducer, sagas);

export default reduxModule;
