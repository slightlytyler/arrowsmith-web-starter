import { createApiActionTypeSet } from 'api/helpers';
import { NAME } from './constants';

export const createRecord = createApiActionTypeSet(NAME, 'CREATE_RECORD');

export const updateRecord = createApiActionTypeSet(NAME, 'UPDATE_RECORD');

export const fetchRecord = createApiActionTypeSet(NAME, 'FETCH_RECORD');

