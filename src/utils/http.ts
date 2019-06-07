import axios from 'axios';

interface IHosts {
  development: string;
  production: string;
  staging?: string;
  demo?: string;
}

const apiHosts: IHosts = {
  development: '/',
  production: '/',
  staging: '/',
  demo: '/',
};

const { SERVER_ENV } = process.env;

const apiHost: string  = SERVER_ENV ? apiHosts[SERVER_ENV] : apiHosts.development;
const apiVersion: string = 'v1';

const instance = axios.create({
  baseURL: `${apiHost}/api/${apiVersion}`,
});

export default instance;
