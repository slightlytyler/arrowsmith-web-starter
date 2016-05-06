import { createService } from 'utils/request';
import { NAME } from './constants';

const service = createService(NAME);

export const createRecord = payload => service.createRecord(payload);

export const updateRecord = (id, payload) => service.updateRecord(id, payload);

export const deleteRecord = id => service.deleteRecord(id);

export const fetchCollection = query => service.fetchCollection(query);
