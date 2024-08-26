import axios from 'axios';

const jwtAxios = axios.create({
  // baseURL: 'https://enjoey-mongo-api.herokuapp.com/api/', //YOUR_API_URL HERE
  baseURL: 'http://localhost:8000/api/', //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
jwtAxios.interceptors.request.use(
  function (config) {
    config = setConfigHeader(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);
export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    localStorage.setItem('token', token);
  } else {
    console.log('setAuthToken');
    delete jwtAxios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export const setAuthBranch = (branchId) => {
  if (branchId) {
    jwtAxios.defaults.headers.common['X-Branch'] = branchId;
    localStorage.setItem('branchId', branchId);
    console.log('setAuthBranch-branchId: ', branchId);
  } else {
    delete jwtAxios.defaults.headers.common['X-Branch'];
    localStorage.removeItem('branchId');
  }
};

export const setAuthYear = (yearId) => {
  if (yearId) {
    jwtAxios.defaults.headers.common['X-Y'] = yearId;
    localStorage.setItem('yearId', yearId);
    console.log('setAuthYear-yearId: ', yearId);
  } else {
    delete jwtAxios.defaults.headers.common['X-Y'];
    localStorage.removeItem('yearId');
  }
};

const setConfigHeader = (config) => {
  const accessToken = localStorage.getItem('token');
  const branchId = localStorage.getItem('branchId');
  const yearId = localStorage.getItem('yearId');
  if (accessToken) {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }
  if (branchId) {
    config.headers['X-Branch'] = branchId;
  }
  if (yearId) {
    config.headers['X-Y'] = yearId;
  }
  console.log('setConfigHeaderBranch', branchId, config);
  return config;
};

export default jwtAxios;
