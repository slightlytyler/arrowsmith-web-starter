import { createApiActionTypeSet } from 'api/helpers';
import { NAME } from './constants';

export const createRecord = createApiActionTypeSet(NAME, 'CREATE_RECORD');

export const updateRecord = createApiActionTypeSet(NAME, 'UPDATE_RECORD');

export const deleteRecord = createApiActionTypeSet(NAME, 'DELETE_RECORD');

export const fetchCollection = createApiActionTypeSet(NAME, 'FETCH_COLLECTION');
