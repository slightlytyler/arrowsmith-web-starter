import { createEndpoint } from 'utils/request';
import { NAME } from './constants';

const endpoint = createEndpoint(NAME);

export const createRecord = payload => endpoint.createRecord(payload);

export const updateRecord = (id, payload) => endpoint.updateRecord(id, payload);

export const deleteRecord = id => endpoint.deleteRecord(id);

export const fetchCollection = query => endpoint.fetchCollection(query);
