import request from 'utils/request';
import { NAME } from './constants';

const endpoint = request.createEndpoint(NAME);

export const create = name => endpoint.createRecord({ name });
export const update = (id, payload) => endpoint.updateRecord(id, payload);
export const remove = id => endpoint.removeRecord(id);
export const fetchSingle = id => endpoint.fetchRecord(id);
export const fetchMany = () => endpoint.fetchRecords();
