import axios from 'axios';

export const getGallery = () => {
  return axios(
    'http://my-json-server.typicode.com/moviedb-tech/movies/list',
  ).then(res => res.data);
};

export const getItem = id => {
  return axios(
    `http://my-json-server.typicode.com/moviedb-tech/movies/list/${id}`,
  ).then(res => res.data);
};
