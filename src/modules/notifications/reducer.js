import * as actionTypes from './actionTypes';

export default (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.PUSH:
      return [...state, payload];

    case actionTypes.PULL:
      return state.filter(n => n.uid !== payload.uid);

    default:
      return state;
  }
};
