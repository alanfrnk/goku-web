import { api } from '../configs';

export const addressService = {
  register,
  update,
  getAll,
  delete: _delete,
};

function register(address) {
  return new Promise((resolve, reject) => {        
    api.post('/address/', address).then(response => {
      if (!response.data.success) {
        const error = (response.data && response.data.error) || response.statusText;
        reject(error);
      } else {
        resolve(response.data);
      }
    })
    .catch(err => {
      reject(err);
    });
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    api.get('/address/').then(response => {
      if (!response.data.success) {
        const error = (response.data && response.data.error) || response.statusText;
        reject(error);
      } else {
        resolve(response.data.data);
      }
    })
    .catch(err => {
      reject(err)
    });
  });
}

function update(address) {
  return new Promise((resolve, reject) => {
    api.put(`/address/${address._id}`, address).then(response => {
      if (!response.data.success) {
        const error = (response.data && response.data.error) || response.statusText;
        reject(error);
      } else {
        resolve(response.data);
      }
    });
  });
}

function _delete(id) {
  return new Promise((resolve, reject) => {
    api.delete(`/address/${id}`).then(response => {
      if (!response.data.success) {
        const error = (response.data && response.data.error) || response.statusText;
        reject(error);
      } else {
        resolve(response.data);
      }
    });
  });
}
