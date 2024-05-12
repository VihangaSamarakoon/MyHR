import axios from 'axios';


axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:3001",
});


client.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      alert("You Unauthorized!!! Please loging again");
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default client;
