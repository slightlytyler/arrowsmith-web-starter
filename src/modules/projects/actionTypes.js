import { createApiActionSet } from 'api/helpers';
import { NAME } from './constants';

export const createRecord = createApiActionSet(NAME, 'CREATE_RECORD');

export const updateRecord = createApiActionSet(NAME, 'UPDATE_RECORD');

export const deleteRecord = createApiActionSet(NAME, 'DELETE_RECORD');

export const fetchCollection = createApiActionSet(NAME, 'FETCH_COLLECTION');
