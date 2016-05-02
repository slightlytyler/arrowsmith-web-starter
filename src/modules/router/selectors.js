import { createSelector } from 'reselect';

export const substateSelector = state => state.router.locationBeforeTransitions;

export const querySelector = createSelector(
  substateSelector,
  substate => substate.query
);
