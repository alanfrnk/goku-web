import { addressConstants } from '../constants';

export function adresses(state = {}, action) {
  switch (action.type) {
    case addressConstants.REGISTER_REQUEST:
      return { registering: true };
    case addressConstants.REGISTER_SUCCESS:
      return {};
    case addressConstants.REGISTER_FAILURE:
      return {};
    case addressConstants.UPDATE_REQUEST:
      return { updating: true };
    case addressConstants.UPDATE_SUCCESS:
      return {};
    case addressConstants.UPDATE_FAILURE:
      return {};
    case addressConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case addressConstants.GETALL_SUCCESS:
      return {
        items: action.adresses
      };
    case addressConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case addressConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(address =>
          address._id === action.id
            ? { ...address, deleting: true }
            : address
        )
      };
    case addressConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter(address => address._id !== action.id)
      };
    case addressConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map(address => {
          if (address.id === action.id) {
            const { deleting, ...addressCopy } = address;
            return { ...addressCopy, deleteError: action.error };
          }

          return address;
        })
      };
    default:
      return state
  }
}