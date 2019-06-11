import { put } from 'redux-saga/effects';
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
    loading: true,
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
    loading: true,
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
  *deletePoll({ payload: id }) {
    try {
      yield http.delete(`/polls/${id}`);

      message.success('Enquete deletada com sucesso');
      yield put(reduxModule.actions.deletePollSuccess());
      yield put(reduxModule.actions.fetchPolls());
    } catch (err) {
      const errorInfo = normalizeError(err, 'Falha ao deletar enquete');
      message.error(errorInfo.message);
      yield put(reduxModule.actions.deletePollFailure(errorInfo));
    }
  },
};

const reduxModule = createReduxModule<IState>('polls', initialState, reducer, sagas);

export default reduxModule;
