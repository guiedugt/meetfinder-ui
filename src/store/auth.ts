import createReduxModule from './createReduxModule';
import User from '../models/user';

interface IState {
  logged: boolean;
  user: User;
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
    yield console.log('login sagas:', payload);
  },
  *loginSuccess ({ payload }) {
    yield console.log('loginSuccess sagas:', payload);
  },
  *loginFailure ({ payload }) {
    yield console.log('loginFailure sagas:', payload);
  },
};

const auth = createReduxModule<IState>('auth', initialState, reducer, sagas);

export default auth;
