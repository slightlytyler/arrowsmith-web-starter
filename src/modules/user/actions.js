import { createAsyncAction } from 'helpers/actions';
import * as actionTypes from './actionTypes';

const asyncAction = createAsyncAction(actionTypes);

export const fetchRecord = asyncAction('FETCH_RECORD');

export const login = asyncAction('LOGIN');

export const logout = asyncAction('LOGOUT');

export const signUp = asyncAction('SIGN_UP');
