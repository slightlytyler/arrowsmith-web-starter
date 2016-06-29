import { curry } from 'lodash';

const createDefaultTests = (actions, actionTypes, key) => ({
  default: () => (
    it('returns a pending action by default', () => {
      actions[key]().should.have.property('type', actionTypes[key].pending);
    })
  ),
  success: () => (
    it('returns a success action at success', () => {
      const record = {};
      const action = actions[key].success(record);

      action.should.have.property('type', actionTypes[key].success);
      action.should.have.property('payload', record);
    })
  ),
  failure: () => (
    it('returns a failure action at failure', () => {
      const error = new Error();
      const action = actions[key].failure(error);

      action.should.have.property('type', actionTypes[key].failure);
      action.should.have.deep.property('payload.error', error);
    })
  ),
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
