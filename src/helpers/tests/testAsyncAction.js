import { curry } from 'lodash';
import { constantCase } from 'helpers/string';

const createDefaultTests = (actions, actionTypes, key) => ({
  default: () => {
    it('returns a pending action by default', () => {
      const payload = {};
      const action = actions[key](payload);
      const actionType = actionTypes[constantCase(key)];

      action.should.have.property('type', actionType.pending);
      action.should.have.property('payload', payload);
    });
  },
  success: () => it('returns a success action at success', () => {
    const payload = {};
    const action = actions[key].success(payload);
    const actionType = actionTypes[constantCase(key)];

    action.should.have.property('type', actionType.success);
    action.should.have.property('payload', payload);
  }),
  failure: () => it('returns a failure action at failure', () => {
    const error = new Error();
    const action = actions[key].failure(error);
    const actionType = actionTypes[constantCase(key)];

    action.should.have.property('type', actionType.failure);
    action.should.have.deep.property('payload.error', error);
  }),
});

export default curry((actions, actionTypes, key, customTests = {}) => {
  const defaultTests = createDefaultTests(actions, actionTypes, key);
  const tests = Object.assign({}, defaultTests, customTests);

  return describe(key, () => {
    tests.default();
    tests.success();
    tests.failure();
  });
});
