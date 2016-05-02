const methods = [
  'CREATE_RECORD',
  'UPDATE_RECORD',
  'DELETE_RECORD',
  'FETCH_RECORD',
  'FETCH_COLLECTION',
];
const types = ['REQUEST', 'SUCCESS', 'FAILURE'];

export default MODEL => methods.reduce(
  (result, method) => result.concat(types.map(type => `${MODEL}/${method}/${type}`)),
  []
);