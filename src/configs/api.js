import axios from "axios";
import { userConstants, generalConstants } from '../constants';

export const api = axios.create({
  baseURL: generalConstants.URL_API,
  headers: { 'x-access-token': localStorage.getItem(userConstants.TOKEN_KEY) }
});