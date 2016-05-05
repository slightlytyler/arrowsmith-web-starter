import { createSelector } from 'reselect';
import { NAME } from './constants';

export const substateSelector = state => state[NAME];
export const idSelector = createSelector(
  substateSelector,
  user => user.id
);
export const getId = idSelector;

export const emailSelector = createSelector(
  substateSelector,
  user => user.email
);

export const nameSelector = createSelector(
  substateSelector,
  emailSelector,
  (user, email) => user.name || email
);

export const subscriptionIdSelector = createSelector(
  substateSelector,
  user => user.subscriptionId
);

export const getSubscriptionId = subscriptionIdSelector;

export const avatarSelector = createSelector(
  substateSelector,
  user => user.profileImg
);
