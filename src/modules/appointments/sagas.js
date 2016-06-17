import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as service from './service';
import { actions as notificationActions } from 'modules/notifications';

function* createRecord({ payload, meta: { optimistic: { id } } }) {
  try {
    const response = yield call(service.createRecord, payload);

    yield put(actions.createRecord.success(id, response));

    yield put(actions.transitionToIndex());
  } catch (error) {
    yield put(actions.createRecord.failure(id, error));

    yield put(notificationActions.push({
      message: `Could not create appointment record. ${error}`,
      level: 'error',
    }));
  }
}

function* updateRecord({ payload: { id } }) {
  try {
    const response = yield call(service.updateRecord, id);

    yield put(actions.updateRecord.success(id, response));

    yield put(actions.transitionToIndex());
  } catch (error) {
    yield put(actions.updateRecord.failure(id, error));

    yield put(notificationActions.push({
      message: `Could not update appointment record. ${error}`,
      level: 'error',
    }));
  }
}

function* deleteRecord({ payload: { id } }) {
  try {
    const response = yield call(service.deleteRecord, id);

    yield put(actions.deleteRecord.success(id, response));
  } catch (error) {
    yield put(actions.deleteRecord.failure(id, error));

    yield put(notificationActions.push({
      message: `Could not delete appointment record. ${error}`,
      level: 'error',
    }));
  }
}

function* fetchRecord({ payload: { id } }) {
  try {
    const response = yield call(service.fetchRecord, id);

    yield put(actions.fetchRecord.success(id, response));
  } catch (error) {
    yield put(actions.fetchRecord.failure(id, error));

    yield put(notificationActions.push({
      message: `Could not fetch appointment record. ${error}`,
      level: 'error',
    }));
  }
}

function* fetchCollection({ payload: { query } }) {
  try {
    const response = yield call(service.fetchCollection, query);

    yield put(actions.fetchCollection.success(query, response));
  } catch (error) {
    yield put(actions.fetchCollection.failure(query, error));

    yield put(notificationActions.push({
      message: `Could not fetch appointment collection. ${error}`,
      level: 'error',
    }));
  }
}

function* printRecord({ payload: { id } }) {
  try {
    const response = yield call(service.printRecord, id);

    yield put(actions.printRecord.success(response));

    yield put(notificationActions.push({
      message: `Printed appointment ${id}.`,
      level: 'success',
    }));
  } catch (error) {
    yield put(actions.printRecord.failure(id));

    yield put(notificationActions.push({
      message: `Could not print appointment record. ${error}`,
      level: 'error',
    }));
  }
}

export default function* sagas() {
  yield [
    takeEvery(actionTypes.createRecord.pending, createRecord),
    takeEvery(actionTypes.updateRecord.pending, updateRecord),
    takeEvery(actionTypes.deleteRecord.pending, deleteRecord),
    takeEvery(actionTypes.fetchRecord.pending, fetchRecord),
    takeEvery(actionTypes.fetchCollection.pending, fetchCollection),
    takeEvery(actionTypes.printRecord.pending, printRecord),
  ];
}
