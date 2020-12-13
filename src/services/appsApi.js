import axios from 'axios';

const config = {
  baseURL: 'https://goiteens-dashboard.herokuapp.com/api',
};

export function fetchAppsByQuery(query, page = 1) {
  return axios({
    ...config,
    method: 'get',
    url: '/apps',
    params: {
      page,
      query,
    },
  }).then((res) => res.data);
}

export function fetchAppDetails(appId) {
  return axios({
    ...config,
    method: 'get',
    url: `/apps/${appId}`,
  }).then((res) => res.data);
}

export function createApp(data) {
  return axios({
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    url: '/apps',
    data,
  }).then((res) => res.data);
}

export function editApp(appId, newData) {
  return axios({
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'put',
    url: `/apps/${appId}`,
    data: newData,
  }).then((res) => res.data);
}

export function deleteApp(appId) {
  return axios({
    ...config,
    method: 'delete',
    url: `/apps/${appId}`,
  }).then((res) => res.data);
}
