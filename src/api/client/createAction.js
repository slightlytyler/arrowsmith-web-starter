import { CALL_API } from 'redux-api-middleware';
import { buildHeaders } from 'utils/request';

// actionTypes must be a an array ordered [REQUEST, SUCCESS, FAILURE]
export default (actionTypes, service, config = {}) => (...args) => {
  const [REQUEST, SUCCESS, FAILURE] = actionTypes;
  const { method, endpoint, body } = service(...args);

  const action = {
    method,
    endpoint,
    body: JSON.stringify(body),
    headers: buildHeaders({ 'Content-Type': 'application/json' }),
    types: [
      { type: REQUEST },
      { type: SUCCESS },
      { type: FAILURE },
    ],
  };

  const [requestDescriptor, successDescriptor, failureDescriptor] = action.types;

  if (config.request) Object.assign(requestDescriptor, config.request);
  if (config.success) Object.assign(successDescriptor, config.success);
  if (config.failure) Object.assign(failureDescriptor, config.failure);

  return { [CALL_API]: action };
};
