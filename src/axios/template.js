import axios from './axios'

export function createTemplate (data = {}) {
  return axios({
    method: 'POST',
    url: '/templates',
    data: data
  })
}

export function showTemplate (id = {}, city = {}) {
  return axios({
    method: 'GET',
    url: `/sale/${city}/${id}`
  })
}

export function editTemplate (data = {}, id = {}) {
  return axios({
    method: 'PUT',
    url: `/templates/${id}`,
    data: data
  })
}
