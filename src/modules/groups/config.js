import { SELECT_ITEMS } from './actionTypes';

export default {
  shape: {},
  persist: [
    ['condition', 'selectedItems'],
  ],
  persistTriggers: [SELECT_ITEMS],
};
