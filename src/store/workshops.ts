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
  fetchWorkshops: (state, action) => ({
    ...state,
    loading: true,
  }),
  fetchWorkshopsSuccess: (state, action) => ({
    ...state,
    items: action.payload,
    loading: false,
  }),
  fetchWorkshopsFailure: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  fetchMyWorkshops: (state, action) => ({
    ...state,
    loading: true,
  }),
  fetchMyWorkshopsSuccess: (state, action) => ({
    ...state,
    items: action.payload,
    loading: false,
  }),
  fetchMyWorkshopsFailure: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
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
  editWorkshopSuccess: (state, action) => ({
    ...state,
    loading: false,
  }),
  editWorkshopFailure: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  deleteWorkshop: (state, action) => ({
    ...state,
    loading: true,
  }),
  deleteWorkshopSuccess: (state, action) => ({
    ...state,
    loading: false,
  }),
  deleteWorkshopFailure: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
};

const sagas: ISagas = {
  *fetchWorkshops({ payload = {} }) {
    try {
      const params = {
        page: payload.page || 1,
        pageSize: payload.pageSize || 10,
        status: 'scheduled',
        filter: payload.filter,
      };
      const workshops = yield http.get('/workshops', { params })
        .then(res => res.data);

      yield put(reduxModule.actions.fetchWorkshopsSuccess(workshops));
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao buscar workshops');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.fetchWorkshopsFailure(errorInfo));
    }
  },
  *fetchMyWorkshops({ payload = {} }) {
    try {
      const params = {
        page: payload.page || 1,
        pageSize: payload.pageSize || 10,
        status: 'scheduled',
        filter: payload.filter,
      };
      const workshops = yield http.get('/workshops/mine', { params })
        .then(res => res.data);

      yield put(reduxModule.actions.fetchMyWorkshopsSuccess(workshops));
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao buscar workshops');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.fetchMyWorkshopsFailure(errorInfo));
    }
  },
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
  *editWorkshop({ payload }) {
    try {
      yield http.put(`/workshops/${payload.id}`, payload);

      message.success('Workshop editado com sucesso');
      yield put(reduxModule.actions.editWorkshopSuccess());
      yield put(reduxModule.actions.fetchMyWorkshops());
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao editar workshop');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.editWorkshopFailure(errorInfo));
    }
  },
  *deleteWorkshop({ payload: id }) {
    try {
      yield http.delete(`/workshops/${id}`);

      message.success('Workshop deletada com sucesso');
      yield put(reduxModule.actions.deleteWorkshopSuccess());
      yield put(reduxModule.actions.fetchMyWorkshops());
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao deletar workshop');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.deleteWorkshopFailure(errorInfo));
    }
  },
};

const reduxModule = createReduxModule<IState>('workshops', initialState, reducer, sagas);

export default reduxModule;
