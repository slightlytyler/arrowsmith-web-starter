import { camelCase } from 'lodash';
const methods = [
  'CREATE_RECORD',
  'UPDATE_RECORD',
  'REPLACE_RECORD',
  'DELETE_RECORD',
  'FETCH_RECORD',
  'FETCH_COLLECTION',
];
const types = ['REQUEST', 'SUCCESS', 'FAILURE'];

const createKey = (method, type) => `${method}_${type}`;

const createValue = (NAME, method, type) => `${NAME}/${method}/${type}`;

const createMethodSet = (method, methodTypes) => types.map(type =>
  methodTypes[createKey(method, type)]
);

const typesReducer = (NAME, method) => (result, type) => Object.assign({}, result, {
  [createKey(method, type)]: createValue(NAME, method, type),
});

const methodsReducer = NAME => (result, method) => {
  const methodTypes = types.reduce(typesReducer(NAME, method), {});

  return Object.assign(
    {},
    result,
    methodTypes,
    { [camelCase(method)]: createMethodSet(method, methodTypes) }
  );
};

export default NAME => methods.reduce(methodsReducer(NAME), {});
