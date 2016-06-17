import createService from 'api/service';
import client from 'api/client';
import NAME from './NAME';

const service = createService(NAME);

export const createRecord = service.createRecord;

export const updateRecord = service.updateRecord;

export const deleteRecord = service.deleteRecord;

export const fetchRecord = service.fetchRecord;

export const fetchCollection = service.fetchCollection;

export const printRecord = async id => {
  const response = await client.post('print', { appointmentId: id });
  return response.data;
};
