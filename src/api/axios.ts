import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://backend-dev.tudu.tech/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-App-Version': '1.0.88',
  },
});

api.interceptors.request.use(request => {
  console.log('======================');
  console.log('API REQUEST');
  console.log('URL:', request.baseURL + request.url);
  console.log('METHOD:', request.method);
  console.log('HEADERS:', request.headers);

  console.log('PAYLOAD:', request.data);

  console.log('======================');

  return request;
});

api.interceptors.response.use(
  response => {
    console.log('======================');

    console.log('API RESPONSE');

    console.log('STATUS:', response.status);

    console.log('DATA:', response.data);

    console.log('======================');

    return response;
  },

  error => {
    console.log('======================');

    console.log('API ERROR');

    console.log('STATUS:', error.response?.status);

    console.log('MESSAGE:', error.message);

    console.log('SERVER ERROR:', error.response?.data);

    console.log('FULL ERROR:', error);

    console.log('======================');

    return Promise.reject(error);
  },
);
