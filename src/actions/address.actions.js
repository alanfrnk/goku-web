import { addressConstants } from '../constants';
import { addressService } from '../services';
import { alertActions } from './';

export const addressActions = {
  register,
  update,
  getAll,
  delete: _delete,
};

function register(address) {
  return dispatch => {
    dispatch(request(address));

    addressService.register(address)
      .then(
        address => { 
          dispatch(success());
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(address) { return { type: addressConstants.REGISTER_REQUEST, address } }
  function success(address) { return { type: addressConstants.REGISTER_SUCCESS, address } }
  function failure(error) { return { type: addressConstants.REGISTER_FAILURE, error } }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    addressService.getAll()
      .then(
        adresses => dispatch(success(adresses)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: addressConstants.GETALL_REQUEST } }
  function success(adresses) { return { type: addressConstants.GETALL_SUCCESS, adresses } }
  function failure(error) { return { type: addressConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    addressService.delete(id)
      .then(
        address => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) { return { type: addressConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: addressConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: addressConstants.DELETE_FAILURE, id, error } }
}

function update(address) {
  return dispatch => {
    dispatch(request(address));

    addressService.update(address)
      .then(
        address => { 
          dispatch(success());
          dispatch(alertActions.success('Endereço atualizado com sucesso'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(address) { return { type: addressConstants.UPDATE_REQUEST, address } }
  function success(address) { return { type: addressConstants.UPDATE_SUCCESS, address } }
  function failure(error) { return { type: addressConstants.UPDATE_FAILURE, error } }
}