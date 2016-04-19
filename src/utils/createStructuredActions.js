import { bindActionCreators } from 'redux';
import { mapValues, partial } from 'lodash';

const createPartials = (actions, args) => (
  mapValues(actions, action => partial(action, ...args))
);

export default (actions, ...propKeys) => (dispatch, props) => () => {
  if (propKeys.length) {
    const args = propKeys.map(key => props[key]);
    return bindActionCreators(createPartials(actions, args), dispatch);
  }

  return bindActionCreators(actions, dispatch);
};
