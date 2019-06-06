import createReduxModule from './createReduxModule';
import User from '../models/user';

interface State {
  logged: boolean;
  user: User;
  loading: boolean;
  error: {
    message: string,
    status?: string | number,
    isTimeout?: boolean,
  };
}

const initialState: State = {
  logged: false,
  user: {
    email: '',
    token: '',
  },
  loading: false,
  error: { message: '' },
};

const reducer: Reducer<State> = {
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

const sagas: Sagas = {
  *login ({ payload }) {
    yield console.log('login sagas:', payload);
  },
  *loginSuccess ({ payload }) {
    yield console.log('loginSuccess sagas:', payload);
  },
  *loginFailure ({ payload }) {
    yield console.log('loginFailure sagas:', payload);
  },
};

const auth = createReduxModule<State>('auth', initialState, reducer, sagas);

export default auth;
