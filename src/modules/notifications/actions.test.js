import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { testAction } from 'helpers/tests';

const test = testAction(actions, actionTypes);

describe('notifications actions', () => {
  test('push');
  test('shift');
});
