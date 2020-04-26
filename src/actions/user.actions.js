import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../configs';

export const userActions = {
  login,
  logout,
  register,
  update,
  getAll,
  delete: _delete,
};

function login(user) {
  return dispatch => {
    dispatch(request({ user }));

    userService.login(user)
      .then(
        user => { 
          dispatch(success(user));
          history.push('/app');                                      
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { 
    localStorage.setItem(userConstants.TOKEN_KEY, user.token);
    localStorage.setItem(userConstants.USER_ID, user.user_id);

    return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user, isInternal) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user)
      .then(
        user => { 
          dispatch(success());
          if (!isInternal) {
            history.push('/');
            dispatch(alertActions.success('Cadastrado com sucesso'));
          }
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: userConstants.GETALL_REQUEST } }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id)
      .then(
        user => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function update(user) {
  return dispatch => {
    dispatch(request(user));

    userService.update(user)
      .then(
        user => { 
          dispatch(success());
          dispatch(alertActions.success('Cadastro atualizado com sucesso'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
  function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
  function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}