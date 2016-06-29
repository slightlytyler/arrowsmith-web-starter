import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { testAsyncAction } from 'helpers/tests';

const asyncTest = testAsyncAction(actions, actionTypes);

describe('user actions', () => {
  asyncTest('fetchRecord');
  asyncTest('login');
  asyncTest('logout', {
    success: () => it('returns a success action at success', () => {
      const action = actions.logout.success();
      action.should.have.property('type', actionTypes.LOGOUT.success);
    }),
  });
  asyncTest('signUp');
});
