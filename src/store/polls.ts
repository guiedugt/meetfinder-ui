import { put, select } from 'redux-saga/effects';
import { message } from 'antd';

import createReduxModule from './createReduxModule';
import { normalizeError } from '../utils/error';
import http from '../utils/http';

interface IState {
  item?: IPoll;
  items: IPoll[];
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
  fetchPolls: (state, action) => ({
    ...state,
    loading: true,
  }),
  fetchPollsSuccess: (state, action) => ({
    ...state,
    items: action.payload,
    loading: false,
  }),
  fetchPollsFailure: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  fetchMyPolls: (state, action) => ({
    ...state,
    loading: true,
  }),
  fetchMyPollsSuccess: (state, action) => ({
    ...state,
    items: action.payload,
    loading: false,
  }),
  fetchMyPollsFailure: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  createPoll: (state, action) => ({
    ...state,
    loading: true,
  }),
  createPollSuccess: (state, action) => ({
    ...state,
    loading: false,
  }),
  createPollFailure: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  editPoll: (state, action) => ({
    ...state,
    loading: true,
  }),
  editPollSuccess: (state, action) => ({
    ...state,
    loading: false,
  }),
  editPollFailure: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  deletePoll: (state, action) => ({
    ...state,
    loading: true,
  }),
  deletePollSuccess: (state, action) => ({
    ...state,
    loading: false,
  }),
  deletePollFailure: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  votePoll: (state, action) => ({
    ...state,
    loading: true,
  }),
  votePollSuccess: (state, action) => ({
    ...state,
    items: action.payload,
    loading: false,
  }),
  votePollFailure: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
};

const sagas: ISagas = {
  *fetchPolls({ payload = {} }) {
    try {
      const params = {
        page: payload.page || 1,
        pageSize: payload.pageSize || 10,
        status: 'voting',
        filter: payload.filter,
      };
      const polls = yield http.get('/polls', { params })
        .then(res => res.data);

      yield put(reduxModule.actions.fetchPollsSuccess(polls));
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao buscar enquetes');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.fetchPollsFailure(errorInfo));
    }
  },
  *fetchMyPolls({ payload = {} }) {
    try {
      const params = {
        page: payload.page || 1,
        pageSize: payload.pageSize || 10,
        status: 'voting',
        filter: payload.filter,
      };
      const polls = yield http.get('/polls/mine', { params })
        .then(res => res.data);

      yield put(reduxModule.actions.fetchPollsSuccess(polls));
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao buscar enquetes');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.fetchPollsFailure(errorInfo));
    }
  },
  *createPoll({ payload }) {
    try {
      yield http.post('/polls', payload);

      message.success('Enquete criada com sucesso');
      yield put(reduxModule.actions.createPollSuccess());
      yield put(reduxModule.actions.fetchMyPolls());
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao criar enquete');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.createPollFailure(errorInfo));
    }
  },
  *editPoll({ payload }) {
    try {
      yield http.put(`/polls/${payload.id}`, payload);

      message.success('Enquete editada com sucesso');
      yield put(reduxModule.actions.editPollSuccess());
      yield put(reduxModule.actions.fetchMyPolls());
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao editar enquete');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.editPollFailure(errorInfo));
    }
  },
  *deletePoll({ payload: id }) {
    try {
      yield http.delete(`/polls/${id}`);

      message.success('Enquete deletada com sucesso');
      yield put(reduxModule.actions.deletePollSuccess());
      yield put(reduxModule.actions.fetchMyPolls());
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao deletar enquete');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.deletePollFailure(errorInfo));
    }
  },
  *votePoll({ payload }) {
    try {
      const { id, subject } = payload;
      const poll = yield http.post(`/polls/${id}/vote`, subject)
        .then(res => res.data);

      const polls: IPoll[] = yield select(store => store.polls.items);
      const index: number = polls.findIndex(poll => poll.id === id);
      polls[index] = poll;

      message.success('Voto computado');
      yield put(reduxModule.actions.votePollSuccess([...polls]));
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao computar voto');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.votePollFailure(errorInfo));
    }
  },
};

const reduxModule = createReduxModule<IState>('polls', initialState, reducer, sagas);

export default reduxModule;
