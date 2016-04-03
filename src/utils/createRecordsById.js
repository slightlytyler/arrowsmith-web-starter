import { zipObject, map } from 'lodash';

export default function createRecordsById(records) {
  return zipObject(map(records, record => record.id), records);
}
