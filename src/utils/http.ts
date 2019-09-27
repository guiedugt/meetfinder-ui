import axios, { AxiosResponse } from 'axios';

const apiHost: string = 'http://ec2-34-238-234-93.compute-1.amazonaws.com';

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

export const mapHeadersToData = (...headers: string[]) => (res: AxiosResponse) => {
  headers.forEach((header) => {
    const headerName = header.substr(0, 2).toLocaleLowerCase() === 'x-' ? header.slice(2) : header;
    res.data[headerName] = res.headers[header];
  });
  return res.data;
};

export default instance;
