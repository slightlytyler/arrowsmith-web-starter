import request from 'utils/request';
import { NAME as endpoint } from './constants';

export const create = async payload => request.createRecord(endpoint, payload);
export const update = async (id, payload) => request.updateRecord(endpoint, id, payload);
export const remove = async id => request.removeRecord(endpoint, id);
export const fetchSingle = id => request.fetchRecord(endpoint, id);
export const fetchMany = () => request.fetchRecords(endpoint);
