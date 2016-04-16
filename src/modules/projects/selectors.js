import { createSelector } from 'reselect';
import { map } from 'lodash';
import createRecordsById from 'utils/createRecordsById';

export const projectsSelector = state => state.projects;

export const recordsSelector = createSelector(
  projectsSelector,
  projects => projects.records,
);

export const recordIdsSelector = createSelector(
  recordsSelector,
  records => map(records, record => record.id),
);

export const recordsByIdSelector = createSelector(
  recordsSelector,
  records => createRecordsById(records),
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);
