import request from 'utils/request';
import { NAME } from './constants';

const endpoint = request.createEndpoint(NAME);

export const create = name => endpoint.createRecord({ name });
export const update = (id, payload) => endpoint.updateRecord(id, payload);
export const destroy = id => endpoint.destroyRecord(id);
export const get = id => endpoint.getRecord(id);
export const fetch = () => endpoint.fetchRecords();
