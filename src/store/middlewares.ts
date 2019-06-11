import http, { setToken } from '../utils/http';
import get from 'lodash/get';
import { message } from 'antd';
import auth from '../store/auth';
import { JWT_EXPIRATION } from '../utils/constants';

export const handleToken = store => next => (action) => {
  const isRehydrate = action.type === 'persist/REHYDRATE';
  const rehydrateToken = get(action, 'payload.auth.token');

  // Set token on rehydrate
  if (isRehydrate && rehydrateToken) setToken(rehydrateToken, true);

  const token = http.defaults.headers.common['x-token'];
  const tokenSetTime = localStorage.getItem('token:settime');
  const now = Date.now();

  // Logout on token expiration
  if (isRehydrate && token && now >= Number(tokenSetTime) + JWT_EXPIRATION) {
    message.info('Faça login para continuar');
    return store.dispatch(auth.actions.logout());
  }

  next(action);
};
