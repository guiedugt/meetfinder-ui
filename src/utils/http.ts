import axios from 'axios';

interface IHosts {
  development: string;
  production: string;
  staging?: string;
  demo?: string;
}

const apiHosts: IHosts = {
  development: 'https://meetfinderapi.herokuapp.com',
  production: 'https://meetfinderapi.herokuapp.com',
  staging: 'https://meetfinderapi.herokuapp.com',
  demo: 'https://meetfinderapi.herokuapp.com',
};

const { SERVER_ENV } = process.env;

const apiHost: string  = SERVER_ENV ? apiHosts[SERVER_ENV] : apiHosts.development;

const instance = axios.create({
  baseURL: apiHost,
});

export const setToken = (token: string, isRehydrate: boolean = false): void => {
  instance.defaults.headers.common['x-token'] = token;
  !isRehydrate && localStorage.setItem('token:settime', String(Date.now()));
};

export const removeToken = (): void => {
  delete instance.defaults.headers.common['x-token'];
};

export default instance;
