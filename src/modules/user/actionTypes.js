import { createAsyncActionTypeSet } from 'helpers/actionTypes';
import NAME from './NAME';

export const fetchRecord = createAsyncActionTypeSet(NAME, 'FETCH_RECORD');

export const login = createAsyncActionTypeSet(NAME, 'LOGIN');

export const logout = createAsyncActionTypeSet(NAME, 'LOGOUT');

export const signUp = createAsyncActionTypeSet(NAME, 'SIGN_UP');
