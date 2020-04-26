import { alertConstants } from '../constants';
import swal from 'sweetalert';

export const alertActions = {
  success,
  error,
  clear
};

function success(message) {
  swal('Sucesso', message, 'success');
  return {
    type: alertConstants.SUCCESS, message
  };
}

function error(message) {
  swal('Erro', message, 'error');
  return { 
    type: alertConstants.ERROR, message 
  };
}

function clear() {
  return { 
    type: alertConstants.CLEAR 
  };
}