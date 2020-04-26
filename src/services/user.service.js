import { api } from '../configs';

export const userService = {
  login,
  logout,
  register,
};

function login(user) {
  return new Promise((resolve, reject) => {
    api.post("/user/login", user).then(response => { 
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
    api.post("/user/register", user).then(response => {
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
