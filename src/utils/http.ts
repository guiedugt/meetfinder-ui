import axios from 'axios';

interface IHosts {
  development: string;
  production: string;
  staging?: string;
  demo?: string;
}

const apiHosts: IHosts = {
  development: 'https://meetfinder.herokuapp.com',
  production: 'https://meetfinder.herokuapp.com',
  staging: 'https://meetfinder.herokuapp.com',
  demo: 'https://meetfinder.herokuapp.com',
};

const { SERVER_ENV } = process.env;

const apiHost: string  = SERVER_ENV ? apiHosts[SERVER_ENV] : apiHosts.development;

const instance = axios.create({
  baseURL: apiHost,
});

export default instance;
