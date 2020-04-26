import { api } from '../configs';

export const userService = {
  login,
  logout,
  register,
  update,
  getAll,
  delete: _delete,
};

function login(user) {
  return new Promise((resolve, reject) => {
    api.post('/user/login', user).then(response => { 
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

function logout() {
  localStorage.removeItem('user');
}

function register(user) {
  return new Promise((resolve, reject) => {        
    api.post('/user/register', user).then(response => {
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
    api.get('/user/').then(response => {
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

function update(user) {
  return new Promise((resolve, reject) => {
    api.put(`/user/${user._id}`, user).then(response => {
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
    api.delete(`/user/${id}`).then(response => {
      if (!response.data.success) {
        const error = (response.data && response.data.error) || response.statusText;
        reject(error);
      } else {
        resolve(response.data);
      }
    });
  });
}
