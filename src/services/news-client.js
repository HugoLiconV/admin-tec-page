import client from './api-client';

export async function getNews({ limit, skip, ...rest }) {
  const deferFnParams = (rest && rest[0]) || {};
  const res = await client(
    `/news?limit=${deferFnParams.limit || limit}&skip=${
      deferFnParams.skip !== null && deferFnParams.skip !== undefined ? deferFnParams.skip : skip
    }`
  ).catch(error => {
    return Promise.reject(error);
  });
  return res.data;
}

export async function createNews(data) {
  const res = await client('/news', {
    method: 'post',
    data
  });
  return res.data;
}

export async function updateNews(id, data) {
  const res = await client(`/news/${id}`, {
    method: 'put',
    data
  });
  return res.data;
}

export async function deleteNews(id) {
  const res = await client(`/news/${id}`, {
    method: 'delete'
  });
  return res.data;
}

export async function index({ id }) {
  const res = await client(`/news/${id}`).catch(error => {
    return Promise.reject(error);
  });
  return res.data;
}
