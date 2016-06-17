import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as service from './service';
import { actions as notificationActions } from 'modules/notifications';

function* fetchCollection({ payload: { query } }) {
  try {
    const response = yield call(service.fetchCollection, query);

    yield put(actions.fetchCollection.success(query, response));
  } catch (error) {
    yield put(actions.fetchCollection.failure(query, error));

    yield put(notificationActions.push({
      message: `Could not fetch providers collection. ${error}`,
      level: 'error',
    }));
  }
}

export default function* sagas() {
  yield [
    takeEvery(actionTypes.fetchCollection.pending, fetchCollection),
  ];
}
