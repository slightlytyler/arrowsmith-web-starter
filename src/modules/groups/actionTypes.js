import { createAsyncActionTypeSet } from 'helpers/actionTypes';
import NAME from './NAME';

export const fetchCollection = createAsyncActionTypeSet(NAME, 'FETCH_COLLECTION');

export const SELECT_ITEMS = `${NAME}/SELECT_ITEMS`;
